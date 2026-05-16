import { useEffect } from "react";
import styles from "./AboutPage.module.css";

export default function AboutPage() {
  useEffect(() => {
    document.title = "关于 — 她史";
  }, []);
  return (
    <div className={styles.page}>
      <h1>关于她史</h1>
      <p>
        「她史」是一个致力于记录和展示国内外女性重大历史事件的开放项目。
        我们相信，女性的历史是人类历史不可分割的一部分，她们的贡献、抗争和成就值得被看见、被铭记。
      </p>
      <h2>我们的目标</h2>
      <p>
        通过时间线的形式，系统梳理对女性地位产生深远影响的关键事件——从法律变革到社会运动，
        从思想启蒙到个人突破。我们希望通过这些记录，帮助人们理解女性处境的来路，并为当下的讨论提供历史坐标系。
      </p>
      <h2>内容范围</h2>
      <p>
        涵盖中国和世界范围内与女性权利、教育、劳动、政治参与、文化与思想等相关的重要事件。
        时间跨度从古代到当代，不限地域与民族。
      </p>
      <h2>参与贡献</h2>
      <p>
        本项目内容持续更新中。如果你发现有重要事件遗漏，或有资料可以补充，
        欢迎通过 GitHub 提交 issue 或 pull request 参与贡献。
        让我们一起构建一部更完整的女性史。
      </p>
    </div>
  );
}
