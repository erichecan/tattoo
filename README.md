# Tattoo Studio Website

一个现代化的 Tattoo Studio 网站，使用 React + TailwindCSS 构建，具有深色主题和优雅的动画效果。

## 🎨 设计特色

- **深色主题**: 深色背景搭配金色和灰白色文字，营造专业艺术氛围
- **现代 UI**: 使用 TailwindCSS 构建的响应式设计
- **流畅动画**: 集成 Framer Motion 提供优雅的页面过渡和交互效果
- **专业布局**: 清晰的信息架构和直观的用户体验

## 🚀 功能特性

### 页面结构
1. **首页 (Home)**
   - Hero 区域展示品牌标识和标语
   - 统计数据展示（客户数量、经验年限、作品数量）
   - 艺术家介绍和 CTA 区域

2. **风格介绍 (Styles)**
   - 6种主要纹身风格展示
   - 每种风格包含详细描述、特点、难度和时长
   - 响应式卡片布局

3. **作品集 (Portfolio)**
   - 网格布局展示作品图片
   - 按风格筛选功能
   - 图片模态框查看详情
   - 支持图片导航

4. **预约系统 (Booking)**
   - 集成 react-calendar 日历组件
   - 时间段选择
   - 完整的预约表单
   - 预留 Google Calendar API 集成接口

### 技术特性
- **响应式设计**: 支持移动端和桌面端
- **路由系统**: 使用 React Router 实现单页应用
- **状态管理**: React Hooks 管理组件状态
- **动画效果**: Framer Motion 提供流畅的动画
- **图标系统**: Lucide React 图标库

## 🛠️ 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **样式框架**: TailwindCSS
- **路由**: React Router DOM
- **动画**: Framer Motion
- **日历组件**: React Calendar
- **图标**: Lucide React
- **字体**: Google Fonts (Inter + Playfair Display)

## 📦 安装和运行

### 前置要求
- Node.js 16+ 
- npm 或 yarn

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 开发模式运行
```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

### 预览生产版本
```bash
npm run preview
# 或
yarn preview
```

## 🎯 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Navbar.jsx      # 导航栏组件
│   └── Footer.jsx      # 页脚组件
├── pages/              # 页面组件
│   ├── Home.jsx        # 首页
│   ├── Styles.jsx      # 风格介绍页
│   ├── Portfolio.jsx   # 作品集页
│   └── Booking.jsx     # 预约页
├── App.jsx             # 主应用组件
├── main.jsx            # 应用入口
└── index.css           # 全局样式
```

## 🔧 自定义配置

### TailwindCSS 配置
项目使用自定义的 TailwindCSS 配置，包含：
- 自定义颜色主题（金色、深色、灰白色）
- 自定义字体（Playfair Display、Inter）
- 自定义动画和过渡效果

### 颜色主题
```css
primary: #D4AF37 (金色)
dark: #0F0F0F (深色)
accent: #E5E5E5 (灰白色)
```

## 🚀 部署

项目使用 Vite 构建，可以部署到任何静态托管服务：

1. 运行 `npm run build` 生成生产文件
2. 将 `dist` 文件夹部署到你的托管服务

## 🔮 未来扩展

- [ ] Google Calendar API 集成
- [ ] 用户认证系统
- [ ] 在线支付集成
- [ ] 作品集图片上传
- [ ] 客户评价系统
- [ ] 多语言支持

## 📝 开发说明

### 代码规范
- 使用函数组件和 React Hooks
- 遵循 ESLint 规则
- 组件命名使用 PascalCase
- 文件命名使用 PascalCase

### 注释规范
- 每个组件顶部添加创建时间和功能说明
- 复杂逻辑添加行内注释
- 使用中文注释说明业务逻辑

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目。

## 📄 许可证

MIT License

---

**创建时间**: 2024-12-19 15:30:00  
**开发者**: AI Assistant  
**版本**: 1.0.0
