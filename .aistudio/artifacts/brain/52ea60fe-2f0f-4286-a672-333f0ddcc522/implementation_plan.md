# 代码标准化重构路线图与实施执行记录

遵循代码标准化重构指南，对本项目由上至下存在的巨石组件（Monolithic Components）实施分阶段、渐进式的标准化重构，将庞大的视图与交织的动画/计算逻辑解耦为“业务 Hooks + 领域纯展示组件（Presentational Components）”。

## 用户确认决策与基准策略

> [!NOTE]
> - **推进顺序**：由上至下（From Top to Bottom），按页面在 `App.tsx` 中的布局顺序依次处理首个核心巨石模块 `UnifiedFeaturesSection`（826行），随后推进 `BarberInfoSection` / `理发师信息页.tsx`（1615行巨石）。
> - **推进节奏**：一步步来（Step-by-Step），严格执行“体检报告 -> 提取Hooks -> 拆分组件 -> 渐进替换验证”闭环。
> - **目录架构**：按业务领域划分（Domain-Driven Subdirectories），建立 `src/components/features-showcase/` 与 `src/components/barber-info/` 目录组织。
> - **样式与动画保全**：严格保持原有的 Tailwind CSS、Motion 缓动曲线与数学对齐参数原封不动，保证 100% 视觉与交互一致性。

---

## 实施完成记录（Execution Summary）

### 模块一：UnifiedFeaturesSection（由 826 行瘦身为 115 行纯编排容器）
- **类型定义** (`src/components/features-showcase/types.ts`):
  - 定义了 `StageId`, `StageTabItem`, `StageScrollState` 等严格接口，杜绝任何 `any`。
- **数学与滚动工具** (`src/components/features-showcase/math.ts`):
  - 提取 `getX`, `getY`, `getW`, `getH` 及 Quart 减速曲线算法 `smoothScrollTo`。
- **逻辑抽离（Custom Hooks）**:
  - `useFeatureScrollStage.ts`: 统一管理 400vh 滚轮输入、420 刚度物理弹簧、4 阶段指示卡位置与 40+ 组 `useTransform` 变换流。
  - `useStageScrollNavigator.ts`: 统一管理各 Stage 锚点偏移量计算与平滑滚动导航。
- **纯展示子组件拆分（Presentational Components）**:
  - `<StageDescription>`: 负责 4 阶段标题与副标题 SVG 动态渐隐渐显文案。
  - `<StageTabBar>`: 负责 1~4 选项卡底座与按钮组，保留 100% 物理扩展数学逻辑与 Hover 弹簧微动。
  - `<StageOneMockup>`: 负责 Stage 1 独立样机展开与浮动卡片群组。
  - `<StageMultiMockup>`: 负责 Stage 2/3/4 原地 HUD 交叉淡入淡出、选项卡切换与田字格推移。
- **主组件重构** (`src/components/UnifiedFeaturesSection.tsx`):
  - 仅作为轻量级组装容器，代码量直降 86%，维护性显著提升。

---

### 模块二：BarberInfoSection 与 MobileBarberInfoSection
- **类型定义** (`src/components/barber-info/types.ts`):
  - 规范 `BarberStateId`, `BarberStateItem` 与 `BARBER_STATES` 数据结构。
- **逻辑抽离（Custom Hook）**:
  - `useBarberStateCarousel.ts`: 将原本在 PC 端与移动端重复手写的 5000ms `requestAnimationFrame` 状态自旋轮播逻辑封装为高复用 Hook，彻底消除重复代码。
- **纯展示子组件拆分**:
  - `<BarberIntroModule>`: 负责左侧标题、副标题、徽标切换与响应式排版。
  - `<BarberProgressBar>`: 负责 2px 进度条绘制与宽度映射。
  - `<BarberMarkIcons>`: 负责 4 种能力徽标的矢量绘制。
  - `<BarberWheel>`: 规范化右侧 SVG 轮盘展示。
- **彻底消除对根目录 `理发师信息页.tsx` 巨石文件的直接依赖**:
  - 移动端 `MobileBarberInfoSection` 与 PC 端 `BarberInfoSection` 同步接入标准化模块。

---

## 验证与测试
- **TypeScript 编译**：执行 `npm run build`，成功编译通过，0 类型报错。
- **ESLint / TSC 类型静态检查**：执行 `tsc --noEmit`，通过。
- **交互与视觉保全**：所有动画曲线、SVG 渐变 ID、坐标换算完全保留，视觉无缝还原。
