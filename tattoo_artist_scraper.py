#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Tattoo Artist Website Image Scraper
直接爬取指定艺术家官网的图片
"""

import asyncio
import os
import requests
import time
import json
from pathlib import Path
import logging
from urllib.parse import urljoin, urlparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from playwright.async_api import async_playwright
import re

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('artist_scraper.log'),
        logging.StreamHandler()
    ]
)

class TattooArtistScraper:
    def __init__(self, output_dir="images"):
        """
        初始化爬虫
        
        Args:
            output_dir (str): 输出目录
        """
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        
        # 请求头，模拟浏览器
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        }
        
        # 支持的图片格式
        self.image_extensions = {'.jpg', '.jpeg', '.png', '.webp', '.bmp'}
        
        # 艺术家信息配置
        self.artists = {
            'Japanese': {
                'name': 'Japanese Traditional / Irezumi',
                'websites': [
                    'https://horiyasu.com',
                    'https://japanesetattoo.com',
                    'https://carlhallowell.com',
                    'https://horitiantattoo.com'
                ]
            },
            'Realism': {
                'name': 'Black & Grey Realism',
                'websites': [
                    'https://oscarakermo.com',
                    'https://bobtyrrell.com',
                    'https://erasoltestudios.com',
                    'https://zentattoostudio.com',
                    'https://hellboundtattoos.ca'
                ]
            },
            'Geometric': {
                'name': 'Sacred Geometry',
                'websites': [
                    # Dillon Forte 需要搜索，先放一些几何风格的网站
                    'https://sacredgeometrytattoo.com',
                    'https://geometrictattoo.com'
                ]
            },
            'Traditional': {
                'name': 'New Traditional / Color Realism',
                'websites': [
                    'https://manjeettattooz.com'
                ]
            },
            'Dark': {
                'name': 'Surreal / Dark Style',
                'websites': [
                    'https://lastrites.tv'
                ]
            },
            'Chicano': {
                'name': 'Chicano / Street Art',
                'websites': [
                    'https://mistercartoon.com'
                ]
            }
        }
        
        # 创建输出目录
        self.setup_directories()
    
    def setup_directories(self):
        """创建输出目录结构"""
        for style in self.artists.keys():
            style_dir = self.output_dir / style
            style_dir.mkdir(exist_ok=True)
            logging.info(f"创建目录: {style_dir}")
    
    async def scrape_images_from_website(self, url, style):
        """
        从艺术家官网爬取图片
        
        Args:
            url (str): 网站URL
            style (str): 纹身风格
            
        Returns:
            list: 图片URL列表
        """
        image_urls = []
        
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            try:
                logging.info(f"正在爬取网站: {url}")
                
                # 设置页面超时
                page.set_default_timeout(30000)
                
                # 访问网站
                await page.goto(url, wait_until='domcontentloaded')
                
                # 等待页面加载
                await asyncio.sleep(3)
                
                # 查找图片元素
                images = await page.query_selector_all('img')
                logging.info(f"找到 {len(images)} 个图片元素")
                
                for img in images:
                    try:
                        src = await img.get_attribute('src')
                        if src:
                            # 转换为绝对URL
                            absolute_url = urljoin(url, src)
                            
                            # 验证是否为有效的图片URL
                            if self.is_valid_image_url(absolute_url):
                                image_urls.append(absolute_url)
                                logging.info(f"找到图片: {absolute_url}")
                    
                    except Exception as e:
                        logging.warning(f"提取图片时出错: {e}")
                        continue
                
                # 查找背景图片
                elements_with_bg = await page.query_selector_all('*[style*="background"]')
                for element in elements_with_bg:
                    try:
                        style_attr = await element.get_attribute('style')
                        if style_attr and 'background-image' in style_attr:
                            # 提取背景图片URL
                            bg_match = re.search(r'url\(["\']?([^"\')\s]+)["\']?\)', style_attr)
                            if bg_match:
                                bg_url = bg_match.group(1)
                                absolute_bg_url = urljoin(url, bg_url)
                                if self.is_valid_image_url(absolute_bg_url):
                                    image_urls.append(absolute_bg_url)
                                    logging.info(f"找到背景图片: {absolute_bg_url}")
                    except Exception as e:
                        logging.warning(f"提取背景图片时出错: {e}")
                        continue
                
                # 查找 data-src 属性（懒加载图片）
                lazy_images = await page.query_selector_all('img[data-src]')
                for img in lazy_images:
                    try:
                        data_src = await img.get_attribute('data-src')
                        if data_src:
                            absolute_url = urljoin(url, data_src)
                            if self.is_valid_image_url(absolute_url):
                                image_urls.append(absolute_url)
                                logging.info(f"找到懒加载图片: {absolute_url}")
                    except Exception as e:
                        logging.warning(f"提取懒加载图片时出错: {e}")
                        continue
                
                # 查找 picture 元素中的 source
                picture_sources = await page.query_selector_all('picture source')
                for source in picture_sources:
                    try:
                        srcset = await source.get_attribute('srcset')
                        if srcset:
                            # 提取 srcset 中的第一个图片URL
                            first_url = srcset.split(',')[0].split(' ')[0]
                            absolute_url = urljoin(url, first_url)
                            if self.is_valid_image_url(absolute_url):
                                image_urls.append(absolute_url)
                                logging.info(f"找到 picture source 图片: {absolute_url}")
                    except Exception as e:
                        logging.warning(f"提取 picture source 时出错: {e}")
                        continue
                
                await browser.close()
                
            except Exception as e:
                logging.error(f"爬取网站 {url} 时出错: {e}")
                await browser.close()
        
        return image_urls
    
    def is_valid_image_url(self, url):
        """
        验证是否为有效的图片URL
        
        Args:
            url (str): 图片URL
            
        Returns:
            bool: 是否为有效图片URL
        """
        try:
            parsed = urlparse(url)
            
            # 检查是否为HTTP/HTTPS链接
            if parsed.scheme not in ['http', 'https']:
                return False
            
            # 检查文件扩展名
            path = parsed.path.lower()
            if not any(path.endswith(ext) for ext in self.image_extensions):
                return False
            
            # 过滤掉一些常见的非图片URL
            if any(keyword in url.lower() for keyword in ['svg', 'gif', 'video', 'thumb', 'icon', 'logo', 'avatar']):
                return False
            
            # 过滤掉太小的图片（可能是图标）
            if any(size in url.lower() for size in ['16x16', '32x32', '48x48', '64x64', '128x128']):
                return False
            
            return True
            
        except Exception:
            return False
    
    def download_image(self, url, filepath):
        """
        下载单张图片
        
        Args:
            url (str): 图片URL
            filepath (Path): 保存路径
            
        Returns:
            bool: 下载是否成功
        """
        try:
            response = requests.get(url, headers=self.headers, timeout=15)
            response.raise_for_status()
            
            # 检查内容类型
            content_type = response.headers.get('content-type', '')
            if not content_type.startswith('image/'):
                logging.warning(f"跳过非图片内容: {content_type}")
                return False
            
            # 保存图片
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            # 验证文件大小
            if filepath.stat().st_size < 2048:  # 小于2KB可能是无效图片
                filepath.unlink()
                logging.warning(f"删除无效图片: {filepath}")
                return False
            
            return True
            
        except Exception as e:
            logging.error(f"下载图片失败 {url}: {e}")
            return False
    
    async def download_images_for_style(self, style, artist_info):
        """
        为指定风格下载图片
        
        Args:
            style (str): 纹身风格
            artist_info (dict): 艺术家信息
        """
        style_dir = self.output_dir / style
        
        logging.info(f"开始为 {style} 风格下载图片...")
        logging.info(f"风格名称: {artist_info['name']}")
        logging.info(f"目标网站: {len(artist_info['websites'])} 个")
        
        # 从每个网站爬取图片
        all_image_urls = []
        for website in artist_info['websites']:
            try:
                logging.info(f"正在处理网站: {website}")
                images = await self.scrape_images_from_website(website, style)
                all_image_urls.extend(images)
                logging.info(f"从 {website} 找到 {len(images)} 张图片")
                
                # 网站之间休息一下
                await asyncio.sleep(2)
                
            except Exception as e:
                logging.error(f"从 {website} 爬取图片时出错: {e}")
                continue
        
        # 去重
        unique_images = list(set(all_image_urls))
        logging.info(f"总共找到 {len(unique_images)} 张唯一图片")
        
        if not unique_images:
            logging.warning(f"未找到 {style} 风格的图片")
            return
        
        # 限制图片数量（每个风格最多30张）
        images_to_download = unique_images[:30]
        
        # 使用线程池并发下载
        successful_downloads = 0
        failed_downloads = 0
        
        with ThreadPoolExecutor(max_workers=5) as executor:
            # 提交下载任务
            future_to_url = {}
            for i, url in enumerate(images_to_download, 1):
                # 确定文件扩展名
                ext = self.get_file_extension(url)
                filename = f"{style.lower()}_{i:02d}{ext}"
                filepath = style_dir / filename
                
                future = executor.submit(self.download_image, url, filepath)
                future_to_url[future] = (url, filepath)
            
            # 处理完成的任务
            for future in as_completed(future_to_url):
                url, filepath = future_to_url[future]
                try:
                    success = future.result()
                    if success:
                        successful_downloads += 1
                        logging.info(f"成功下载: {filepath.name}")
                    else:
                        failed_downloads += 1
                        logging.warning(f"下载失败: {filepath.name}")
                except Exception as e:
                    failed_downloads += 1
                    logging.error(f"下载异常: {filepath.name} - {e}")
                
                # 显示进度
                total = successful_downloads + failed_downloads
                if total % 5 == 0:
                    logging.info(f"进度: {total}/{len(images_to_download)} (成功: {successful_downloads}, 失败: {failed_downloads})")
        
        logging.info(f"{style} 风格下载完成: 成功 {successful_downloads}, 失败 {failed_downloads}")
    
    def get_file_extension(self, url):
        """
        从URL中获取文件扩展名
        
        Args:
            url (str): 图片URL
            
        Returns:
            str: 文件扩展名
        """
        try:
            parsed = urlparse(url)
            path = parsed.path.lower()
            
            for ext in self.image_extensions:
                if path.endswith(ext):
                    return ext
            
            # 默认返回.jpg
            return '.jpg'
            
        except Exception:
            return '.jpg'
    
    async def run(self):
        """运行爬虫，下载所有风格的图片"""
        logging.info("开始爬取 Tattoo 艺术家官网图片...")
        
        for style, artist_info in self.artists.items():
            try:
                logging.info(f"=" * 60)
                logging.info(f"处理风格: {style}")
                logging.info(f"=" * 60)
                
                await self.download_images_for_style(style, artist_info)
                
                # 风格之间休息一下
                await asyncio.sleep(3)
                
            except Exception as e:
                logging.error(f"处理风格 {style} 时出错: {e}")
                continue
        
        logging.info("所有风格处理完成！")
        
        # 统计结果
        self.print_statistics()
    
    def print_statistics(self):
        """打印下载统计信息"""
        logging.info("\n" + "=" * 60)
        logging.info("下载统计")
        logging.info("=" * 60)
        
        total_files = 0
        for style_dir in self.output_dir.iterdir():
            if style_dir.is_dir():
                file_count = len(list(style_dir.glob("*")))
                logging.info(f"{style_dir.name}: {file_count} 张图片")
                total_files += file_count
        
        logging.info(f"总计: {total_files} 张图片")
        logging.info("=" * 60)


async def main():
    """主函数"""
    try:
        # 创建爬虫实例
        scraper = TattooArtistScraper()
        
        # 运行爬虫
        await scraper.run()
        
    except KeyboardInterrupt:
        logging.info("用户中断程序")
    except Exception as e:
        logging.error(f"程序运行出错: {e}")


if __name__ == "__main__":
    asyncio.run(main())
