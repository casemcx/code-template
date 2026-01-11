# Commit Lint 集成实现计划

## 实现任务清单

- [ ] 1. 从 package.json 中移除 husky 和 lint-staged 依赖
  - 从 `devDependencies` 中删除 `husky` 和 `lint-staged`
  - 从 `scripts` 中删除 `prepare: husky` 脚本
  - 参考需求: 2.3, 2.5

- [ ] 2. 安装 commitlint 相关依赖
  - 执行 `pnpm add -D @commitlint/cli @commitlint/config-conventional`
  - 执行 `pnpm add -D commitizen cz-git`
  - 执行 `pnpm add -D lefthook`
  - 参考需求: 2.5

- [ ] 3. 创建 commitlint.config.js 配置文件
  - 创建 `commitlint.config.js`，参考 single 项目配置
  - 配置 extends: ['@commitlint/config-conventional']
  - 配置 rules: body-leading-blank, footer-leading-blank, header-max-length, subject-empty, type-empty, subject-case, type-enum
  - 配置 ignores: 忽略 "init" 提交
  - 配置 prompt: 中文化提示信息、12种提交类型、emoji 支持、自定义 scope
  - 参考需求: 2.1, 2.2, 2.6

- [ ] 4. 创建 lefthook.yml 配置文件
  - 创建 `lefthook.yml`
  - 配置 `pre-commit` hook，调用 lint-staged 对代码进行格式化检查
  - 配置 `commit-msg` hook，调用 commitlint 校验提交信息
  - 启用并行执行 (parallel: true)
  - 参考需求: 2.4

- [ ] 5. 更新 package.json 配置
  - 在 `scripts` 中添加 `"prepare": "lefthook install"`
  - 在 `config.commitizen` 中配置 `"path": "node_modules/cz-git"`
  - 可选：添加 `"commit": "git cz"` 脚本快捷方式
  - 参考需求: 2.6

- [ ] 6. 删除 .husky 目录
  - 删除 `.husky` 目录及其所有内容
  - 参考需求: 2.3

- [ ] 7. 安装 lefthook git hooks
  - 执行 `npx lefthook install` 安装 git hooks
  - 验证 `.git/hooks/` 目录下已生成 lefthook hooks
  - 参考需求: 2.3, 2.4

- [ ] 8. 验证 commitlint 校验功能
  - 测试有效的 commit message: `git commit -m "feat: 测试提交"`
  - 测试无效的 commit message: `git commit -m "test message"`（应被拒绝）
  - 参考需求: 2.1

- [ ] 9. 验证交互式提交功能
  - 测试 `git cz` 或 `npx git cz` 命令
  - 验证交互式界面显示正常（中文提示、emoji 图标）
  - 完成一次完整的交互式提交流程
  - 参考需求: 2.2

- [ ] 10. 验证 pre-commit 格式化检查
  - 修改一个代码文件制造格式问题
  - 执行 `git add` 和 `git commit`，验证 pre-commit hook 触发格式化
  - 参考需求: 2.4
