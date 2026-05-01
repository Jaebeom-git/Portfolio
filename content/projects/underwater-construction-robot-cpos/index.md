---
title: Underwater Construction Robot CPOS
titleSuffix: Real-Time Physics Engine Development for a Cyber-Physical Integrated Simulator
topbarTitle: Real-Time Physics Engine Development for a Cyber-Physical Integrated Simulator
shortTitle: Underwater Construction Robot CPOS
layout: research-project
subtitle: Research project on real-time physics engine and simulator development for an underwater construction robot
koreanTitle: 가상 물리 통합 시뮬레이터용 실시간 물리엔진 개발
category: Research Project
group: research
status: Ended
period: Jan. 2022 ~ Nov. 2022
startDate: 2022-01-01
endDate: 2022-11-30
year: 2022
venue: Chungnam National University Design Automation Lab / KRISO
heroImage: /projects/underwater-construction-robot-cpos/thumbnail.png
source: Research project record, local project summary material, and related domestic conference posters
keywords: underwater construction robot, CPOS, real-time dynamics, ROS, RViz, simulator, hydrodynamics, RecurDyn, MATLAB co-simulation, KRISO, CNU, 실시간 물리엔진, 해양로봇, 수중건설 로봇, 동역학 모델, 유체력 모델
---

해양건설로봇 CPOS의 실시간 동역학 해석, ROS 기반 가시화, 유체력 모델링, 가상 물리 통합 시뮬레이터 개발을 수행한 연구과제입니다.

## Overview

This research project developed and validated real-time simulation components for the CPOS underwater construction robot. The work connected multibody dynamics modeling, ROS/RViz visualization, hydrodynamic-force modeling, and simulator integration so that robot behavior could be inspected and evaluated in a virtual environment.

The project materials show three main technical directions: real-time dynamics-model visualization using ROS, virtual-physical simulator development for CPOS, and hydrodynamic-force modeling for realistic underwater robot analysis. These outcomes were organized into three related domestic conference presentations.


## Contributions

- Built and validated real-time multibody dynamics models for the underwater construction robot.
- Developed ROS/RViz-based visualization packages for checking real-time simulation states and robot motion.
- Improved simulator execution by reorganizing the real-time analysis workflow and parallel-processing procedure.
- Developed hydrodynamic-force components including buoyancy, added-mass, and drag-force effects for underwater robot analysis.
- Integrated RecurDyn, MATLAB co-simulation, rotational spring-damper modeling, and external-force handling into the CPOS simulator workflow.

## Related Publications

### Domestic Conference · Apr. 2022 · Poster

**ROS를 활용한 실시간 로봇 동역학 모델 가시화**<br />
Real time Robot Dynamics Model Visualization Using ROS<br />
Jae-Beom Jo, Chang-Ho Lee, Sung-Soo Kim, KSME Spring Meeting, Suwon, Korea, Apr. 2022.

#### Links

- Scholar: https://scholar.google.com/citations?view_op=view_citation&hl=ko&user=e8txR3gAAAAJ&citation_for_view=e8txR3gAAAAJ:g5m5HwL7SMYC

#### Abstract

Real-time simulators for underwater construction robots require accurate dynamics models as well as visualization tools that can expose robot position, posture, and state information during operation. This presentation proposed a ROS/RViz-based visualization workflow for a real-time underwater construction robot dynamics model. The method transformed robot model information into visualization-ready descriptions and connected real-time simulation results with RViz so that the model behavior could be inspected and validated during simulation.

#### Poster

![KSME 2022 poster for real-time robot dynamics model visualization using ROS](/projects/underwater-construction-robot-cpos/ksme-2022-ros-visualization-poster.png)

#### Citation

```bibtex
@inproceedings{jo2022ros,
  title     = {Real time Robot Dynamics Model Visualization Using ROS},
  author    = {Jo, Jae-Beom and Lee, Chang-Ho and Kim, Sung-Soo},
  booktitle = {Proceedings of KSME Spring Meeting},
  address   = {Suwon, Korea},
  month     = apr,
  year      = {2022},
  note      = {Poster}
}
```

### Domestic Conference · Jun. 2022

**해양로봇 가상물리통합 시뮬레이터용 실시간 물리 엔진 개발**<br />
Real-time Physics Engine Development for Underwater Construction Robot Simulator integrated with CPOS<br />
Sung-Soo Kim, Jae-Beom Jo, Hong-Geun Noh, Chang-Ho Lee, Jong-Boo Han, Tae-Kyeong Yeu, KAOSTS Meeting, Jeju, Korea, Jun. 2022.

#### Links

- Scholar: https://scholar.google.com/citations?view_op=view_citation&hl=ko&user=e8txR3gAAAAJ&citation_for_view=e8txR3gAAAAJ:qjMakFHDy7sC

#### Abstract

This presentation reported the development of a real-time physics engine for an underwater construction robot simulator integrated with CPOS. The project connected physical robot modeling, visualization, real-time engine execution, and simulator operation. The local project summary highlights a subsystem-synthesis-based multibody model, ROS-based integration, RecurDyn-MATLAB co-simulation for track-module validation, and improvements to the parallel real-time analysis process.

#### Project Material

![Underwater Construction Robot CPOS project summary](/projects/underwater-construction-robot-cpos/underwater-construction-robot-cpos-project-summary.png)

#### Citation

```bibtex
@inproceedings{kim2022realtime,
  title     = {Real-time Physics Engine Development for Underwater Construction Robot Simulator integrated with CPOS},
  author    = {Kim, Sung-Soo and Jo, Jae-Beom and Noh, Hong-Geun and Lee, Chang-Ho and Han, Jong-Boo and Yeu, Tae-Kyeong},
  booktitle = {Proceedings of KAOSTS Meeting},
  address   = {Jeju, Korea},
  month     = jun,
  year      = {2022}
}
```

### Domestic Conference · Nov. 2022 · Poster

**수중건설 로봇 실시간 해석을 위한 유체력 모델 개발**<br />
Development of Hydro-dynamics Effects for Real-time Analysis of Under-water Construction Robot<br />
Jae-Beom Jo, Chang-Ho Lee, Hong-Geun Noh, Yong-Hwan Kim, Je-Hyeop Han, Sung-Soo Kim, KSME Annual Meeting, Jeju, Korea, Nov. 2022.

#### Links

- Scholar: https://scholar.google.com/citations?view_op=view_citation&hl=ko&user=e8txR3gAAAAJ&citation_for_view=e8txR3gAAAAJ:M05iB0D1s5AC

#### Abstract

A realistic underwater construction robot simulator must represent the physical effects that occur during underwater work. This presentation developed hydrodynamic-force models for real-time robot analysis, including buoyancy, added-mass, and drag-force effects. The model was applied to stabilization and inverse-dynamics simulations, showing how hydrodynamic effects change base motion and joint driving torque during underwater robot operation.

#### Poster

![KSME 2022 poster for hydrodynamic effects in real-time underwater construction robot analysis](/projects/underwater-construction-robot-cpos/ksme-2022-underwater-hydrodynamics-poster.png)

#### Citation

```bibtex
@inproceedings{jo2022hydrodynamics,
  title     = {Development of Hydro-dynamics Effects for Real-time Analysis of Under-water Construction Robot},
  author    = {Jo, Jae-Beom and Lee, Chang-Ho and Noh, Hong-Geun and Kim, Yong-Hwan and Han, Je-Hyeop and Kim, Sung-Soo},
  booktitle = {Proceedings of KSME Annual Meeting},
  address   = {Jeju, Korea},
  month     = nov,
  year      = {2022},
  note      = {Poster}
}
```
