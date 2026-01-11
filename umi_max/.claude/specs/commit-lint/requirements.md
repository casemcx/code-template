# Commit Lint 集成需求文档

## 1. 概述

本项目需要集成 commit-lint 功能，参考 `single` 项目的配置，为 Umi Max 项目添加提交信息规范化和校验能力。这将确保团队成员使用统一的 commit message 格式，提高代码历史的可读性和可维护性。

## 2. 需求详情

### 2.1 提交信息校验

**用户故事:** 作为开发者，我希望在提交代码时能够自动校验 commit message 格式，以便团队使用统一的提交规范。

**验收标准:**
1.1. 系统应在 `git commit` 时自动触发 commit message 校验
1.2. 当 commit message 不符合规范时，系统应拒绝提交并显示错误信息
1.3. 校验规则应支持以下提交类型（type）：
   - feat: 新增功能
   - fix: 修复缺陷
   - docs: 文档变更
   - style: 代码格式（不影响功能）
   - refactor: 代码重构
   - perf: 性能优化
   - test: 测试相关
   - build: 项目打包
   - ci: CI 配置、脚本修改
   - chore: 构建流程、外部依赖变更
   - revert: 回滚 commit
1.4. commit message 的 header 长度不应超过 108 字符
1.5. commit message 的 subject 不应为空
1.6. commit message 的 type 不应为空
1.7. 忽略 "init" 提交的校验

### 2.2 交互式提交辅助

**用户故事:** 作为开发者，我希望有一个交互式的命令行工具帮助我编写符合规范的 commit message，以便降低记忆负担。

**验收标准:**
2.1. 系统应提供交互式提交命令（通过 `git cz` 或 `npm run commit`）
2.2. 交互式界面应支持选择提交类型
2.3. 交互式界面应支持输入自定义 scope 或跳过 scope
2.4. 交互式界面应支持输入简短描述（subject）
2.5. 交互式界面应支持输入详细描述（body，可选）
2.6. 交互式界面应支持列举非兼容性重大变更（breaking，可选）
2.7. 交互式界面应支持关联 issue（可选）
2.8. 界面提示信息应使用中文显示
2.9. 各选项应显示对应的 emoji 图标

### 2.3 Git Hook 工具迁移

**用户故事:** 作为开发者，我希望使用 lefthook 替代 husky 来管理 git hooks，以便获得更好的性能和更简洁的配置。

**验收标准:**
3.1. 应移除现有的 husky 依赖
3.2. 应删除 `.husky` 目录及其配置文件
3.3. 应安装 `lefthook` 包到 devDependencies
3.4. 应从 `package.json` 的 scripts 中移除 `prepare: husky` 脚本

### 2.4 Lefthook 配置

**用户故事:** 作为开发者，我希望通过 lefthook 配置 commit-msg 校验和 pre-commit 代码检查。

**验收标准:**
4.1. 应创建 `lefthook.yml` 配置文件
4.2. 应配置 `commit-msg` hook 触发 commitlint 校验
4.3. 应配置 `pre-commit` hook 触发代码格式检查
4.4. pre-commit 检查应使用现有的 lint-staged 配置
4.5. 配置应启用并行执行以提高性能

### 2.5 依赖安装

**用户故事:** 作为开发者，我希望通过 pnpm 安装所需的依赖包。

**验收标准:**
5.1. 应安装 `@commitlint/cli` 包
5.2. 应安装 `@commitlint/config-conventional` 包
5.3. 应安装 `commitizen` 包
5.4. 应安装 `cz-git` 包
5.5. 应安装 `lefthook` 包
5.6. 应移除 `husky` 和 `lint-staged` 依赖（lint-staged 功能由 lefthook 直接调用）
5.7. 所有依赖应添加到 devDependencies

### 2.6 配置文件

**用户故事:** 作为开发者，我希望配置文件结构清晰且易于维护。

**验收标准:**
6.1. 应创建 `commitlint.config.js` 配置文件
6.2. 配置应包含完整的规则定义
6.3. 配置应包含完整的 prompt 交互配置
6.4. package.json 应包含 commitizen 的 path 配置指向 cz-git
6.5. package.json scripts 应添加 `prepare: lefthook install` 用于自动安装 hooks
6.6. 可选：添加 `npm run commit` 脚本快捷方式

## 3. 技术约束

1. 必须使用 pnpm 作为包管理器
2. 必须使用 lefthook 替代 husky
3. 必须移除所有 husky 相关配置和依赖
4. 配置文件风格应与参考项目保持一致
5. Node.js 版本要求: >= 22.18.0

## 4. 非功能性需求

1. 配置应易于后续扩展和自定义
2. 错误提示信息应清晰明确
3. 交互式操作应简洁高效
