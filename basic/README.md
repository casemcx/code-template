# Semi Admin Monorepo

基于 pnpm + Turbo 的 Monorepo 项目模板，专注于企业级管理系统开发。

## 技术栈

- **包管理器**: pnpm 10.12.4
- **构建工具**: Turbo 2.4.0
- **代码规范**: Biome 1.9.4
- **Git Hooks**: Lefthook 2.0.4
- **提交规范**: Commitizen + cz-git
- **语言**: TypeScript 5.7.3

## 环境要求

- **Node.js**: 22.18.0
- **pnpm**: 10.12.4

### 环境检查

在开始项目之前，请先检查环境版本：

```bash
node -v  # 应该输出 v22.18.0
pnpm -v  # 应该输出 10.12.4
```

如果版本不符合要求，请先升级环境：

```bash
# 升级 Node.js（建议使用 nvm）
nvm install 22.18.0
nvm use 22.18.0

# 升级 pnpm
npm install -g pnpm@10.12.4
```

## 项目结构

```
pnpm-monorepo/
├── apps/              # 应用程序
├── packages/          # 共享包
│   ├── share/        # 共享类型和工具
│   └── utils/        # 工具函数
├── server/           # 服务端代码
├── docs/             # 项目文档
├── .vscode/          # VSCode 配置
├── biome.json        # Biome 配置
├── turbo.json        # Turbo 配置
├── pnpm-workspace.yaml  # pnpm 工作空间配置
└── package.json      # 根包配置
```

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 开发模式

```bash
# 并行启动所有应用
pnpm dev

# 启动特定应用
pnpm --filter <app-name> dev
```

### 3. 代码检查

```bash
# 运行 Biome 代码检查和自动修复
pnpm lint
```

### 4. 清理依赖

```bash
# 清理所有 node_modules
pnpm clean

# 或者使用 reset 命令
pnpm reset
```

## Git 工作流

### 提交规范

项目使用约定式提交（Conventional Commits），使用 Commitizen 辅助提交：

```bash
pnpm commit
```

提交类型说明：
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建或工具相关

### Git Hooks

项目使用 Lefthook 管理 Git Hooks：
- **pre-commit**: 自动运行 Biome 代码检查和格式化
- **commit-msg**: 检查提交信息是否符合规范

## 开发规范

### TypeScript 规范

- 优先使用 `type` 而非 `interface`（除非需要声明合并）
- 避免使用 `any`，优先使用 `unknown` 或具体类型
- 修改 TypeScript 代码后必须进行类型检查

```bash
# 类型检查
pnpm type-check
```

### 代码风格

- 使用 Biome 进行代码格式化和检查
- 单引号字符串
- 箭头函数括号：`asNeeded`
- 每行最大长度：80 字符

### 命名规范

- **组件命名**: PascalCase
- **文件命名**: kebab-case 或 camelCase
- **常量命名**: UPPER_SNAKE_CASE
- **变量和函数**: camelCase

## 常用命令

```bash
# 安装依赖
pnpm install

# 添加依赖
pnpm add <package-name>

# 添加开发依赖
pnpm add -D <package-name>

# 开发模式
pnpm dev

# 代码检查
pnpm lint

# 提交代码
pnpm commit

# 清理依赖
pnpm clean

# 重置依赖
pnpm reset
```

## Monorepo 管理

### pnpm Workspace

项目使用 pnpm workspace 管理多包依赖，配置文件位于 `pnpm-workspace.yaml`。

### Catalog 依赖

项目使用 pnpm catalog 功能统一管理依赖版本：
- `lint`: 代码检查相关
- `node`: Node.js 核心依赖
- `tailwindcss`: Tailwind CSS 相关

使用示例：

```json
{
  "dependencies": {
    "axios": "catalog:app"
  },
  "devDependencies": {
    "@biomejs/biome": "catalog:lint"
  }
}
```

## Turbo 配置

项目使用 Turbo 进行构建任务管理和缓存，配置文件位于 `turbo.json`。

支持的任务：
- `dev`: 开发模式（无缓存，持久化任务）
- `dev-build`: 开发构建（无缓存，持久化任务）

## 文档

更多详细文档请查看 `/docs` 目录。

## 许可证

ISC

## 作者

casemo
