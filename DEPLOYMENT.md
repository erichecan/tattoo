# Tattoo Studio Website - Netlify Deployment Guide

## 🚀 部署到 Netlify

### 方法 1: 通过 GitHub 连接自动部署

1. **访问 [Netlify](https://netlify.com)** 并登录
2. **点击 "New site from Git"**
3. **选择 GitHub** 并授权访问
4. **选择仓库**: `erichecan/tattoo`
5. **配置构建设置**:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **点击 "Deploy site"**

### 方法 2: 手动拖拽部署

1. **构建项目**:
   ```bash
   npm run build
   ```
2. **将 `dist` 文件夹拖拽到 Netlify 部署区域**

## 📁 项目结构

```
tattoo/
├── src/                    # React 源代码
│   ├── components/        # 组件
│   ├── pages/            # 页面
│   └── data/             # 图片数据
├── public/                # 静态资源
│   ├── Japanese/         # 日本传统风格图片
│   ├── Realism/          # 现实主义风格图片
│   ├── Traditional/      # 传统风格图片
│   └── Chicano/          # Chicano 风格图片
├── dist/                  # 构建输出 (部署到 Netlify)
├── netlify.toml          # Netlify 配置
└── package.json          # 项目依赖
```

## 🖼️ 图片资源

- **总数量**: 94 张高质量 tattoo 图片
- **风格分布**:
  - Japanese: 26 张
  - Realism: 30 张
  - Traditional: 21 张
  - Chicano: 17 张

## ⚙️ 技术栈

- **前端**: React 18 + Vite
- **样式**: TailwindCSS
- **动画**: Framer Motion
- **路由**: React Router DOM
- **图标**: Lucide React

## 🔧 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 🌐 部署后访问

部署成功后，Netlify 会提供一个域名，例如：
- `https://your-site-name.netlify.app`
- 或者自定义域名

## 📱 功能特性

- ✅ 响应式设计
- ✅ 现代化 UI/UX
- ✅ 图片画廊
- ✅ 风格分类
- ✅ 预约系统
- ✅ 艺术家介绍
- ✅ 作品集展示

## 🚨 注意事项

1. **图片路径**: 确保图片路径在 `public` 目录下正确
2. **构建输出**: 部署到 Netlify 的是 `dist` 目录
3. **路由**: 使用 SPA 路由，需要配置 Netlify 重定向规则
4. **性能**: 图片已优化，但建议启用 Netlify 的图片优化功能

## 📞 支持

如有问题，请检查：
1. GitHub 仓库连接
2. 构建日志
3. 部署状态
4. 域名配置
