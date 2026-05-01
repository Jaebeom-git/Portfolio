---
title: Motion-Based Sarcopenia Estimation
titleSuffix: Preliminary Study on Dynamic Sarcopenia Estimation Using Video-Tracked Human Motion
topbarTitle: Preliminary Study on Dynamic Sarcopenia Estimation Using Video-Tracked Human Motion
shortTitle: Motion-Based Sarcopenia Estimation
subtitle: Research project on dynamics-based sarcopenia assessment from vision-tracked human motion
layout: research-project
koreanTitle: 영상 추적된 인체 동작을 활용한 동역학적 근감소 추정 선행연구
category: Research Project
group: research
status: Ended
period: Sep. 2023 ~ Aug. 2024
startDate: 2023-09-01
endDate: 2024-08-31
year: 2024
venue: National Research Council of Science & Technology
heroImage: /projects/motion-based-sarcopenia-estimation/thumbnail.png
source: Research project record and related domestic conference presentations
authors: [Jaebeom Jo, Junhyoung Ha, Kihyun Kim, Kanghyun Ryu, Min-gu Kang, Jiyeon Kang]
keywords: sarcopenia, motion analysis, joint torque estimation, ground reaction force estimation, OpenSim, deep learning, Mamba, Transformer, 근감소증, 동작 분석, 관절 토크, 지면 반력, 영상 추적
---

영상 추적된 인체 동작을 활용해 지면 반력과 관절 토크를 추정하고, 일상 동작 기반의 근감소증 평가 가능성을 탐색한 연구과제입니다.

## Overview

This research project investigated motion-based and dynamics-based indicators for sarcopenia assessment in older adults. The project focused on estimating ground reaction forces and lower-limb joint torques from human motion data, with the goal of reducing reliance on force plates and enabling more accessible biomechanical assessment during daily-living movements.

The work combined motion capture, OpenSim-based musculoskeletal simulation, ground-reaction-force estimation, and deep-learning sequence models. It produced two related domestic conference presentations: one on ground-reaction-force and joint-torque prediction during squat motion, and another on sarcopenia detection through motion analysis and joint-torque estimation.

## Research Project

- **Project title:** 영상 추적된 인체 동작을 활용한 동역학적 근감소 추정 선행연구
- **Funding agency:** 국가과학기술연구회
- **Principal investigator:** Jiyeon Kang
- **Role:** Research Assistant
- **Contribution:** 30%
- **Project period:** Sep. 2023 ~ Aug. 2024

## Contributions

- Collected and analyzed motion data from older adults and daily-living movements such as sit-to-stand, step-up, pick-up, and squat.
- Used OpenSim-based musculoskeletal simulation to estimate joint kinematics and joint torques.
- Developed learning-based models for estimating ground reaction forces and ground reaction moments from motion-derived biomechanical features.
- Compared torque-based metrics with established sarcopenia-related indicators such as physical performance, muscle strength, and muscle mass.

## Related Publications

### Domestic Conference · Jul. 2024 · Poster

**딥러닝을 이용한 스쿼트 운동의 지면 반력 및 조인트 토크 예측**<br />
Prediction of Ground Reaction Forces and Joint Torque through Squatting Motion with Deep Learning Algorithm<br />
Jaebeom Jo, Junhyoung Ha, Jiyeon Kang, ICROS, Daejeon, Korea, Jul. 2024.

#### Links

- Scholar: https://scholar.google.com/scholar?oi=bibs&hl=ko&cluster=1633049662350952469

#### Abstract

Biomechanical analysis can estimate joint torque and muscle activity, providing useful information for rehabilitation and diagnostic technologies. However, measuring ground reaction forces requires force plates, controlled laboratory space, and technical expertise. This presentation proposed a deep-learning framework for predicting ground reaction forces, ground reaction moments, and lower-limb joint torques during squat motion from motion-derived biomechanical features.

#### Poster

![ICROS 2024 poster for prediction of ground reaction forces and joint torque through squatting motion](/projects/motion-based-sarcopenia-estimation/icros-2024-squat-biomechanics-prediction.png)

#### Citation

```bibtex
@inproceedings{jo2024prediction,
  title     = {Prediction of Ground Reaction Forces and Joint Torque through Squatting Motion with Deep Learning Algorithm},
  author    = {Jo, Jaebeom and Ha, Junhyoung and Kang, Jiyeon},
  booktitle = {Proceedings of ICROS 2024},
  address   = {Daejeon, Korea},
  month     = jul,
  year      = {2024},
  note      = {Poster}
}
```

### Domestic Conference · Feb. 2025 · Oral

**동작 분석 및 관절 토크 추정을 통한 근감소증 검출에 관한 선행 연구**<br />
Preliminary Study on Sarcopenia Detection through Motion Analysis and Joint Torque Estimation<br />
Jaebeom Jo, Kihyun Kim, Kanghyun Ryu, Min-gu Kang, Junhyoung Ha, Jiyeon Kang, KRoC, Gangwon, Korea, Feb. 2025.

#### Links

- Scholar: https://scholar.google.com/citations?view_op=view_citation&hl=ko&user=e8txR3gAAAAJ&citation_for_view=e8txR3gAAAAJ:ldfaerwXgEUC

#### Abstract

Sarcopenia is characterized by diminished skeletal muscle mass and strength, leading to reduced physical function in older adults. This presentation investigated whether motion analysis and joint-torque estimation can provide a more direct functional indicator for sarcopenia-related muscle weakness during activities of daily living. Joint-torque metrics from sit-to-stand, pick-up, and step-up tasks showed meaningful relationships with established sarcopenia indicators and group-level differences between healthy and sarcopenic participants.

#### Paper

![KRoC 2025 paper page 1](/projects/motion-based-sarcopenia-estimation/kroc-2025-sarcopenia-detection-page-1.png)

![KRoC 2025 paper page 2](/projects/motion-based-sarcopenia-estimation/kroc-2025-sarcopenia-detection-page-2.png)

#### Citation

```bibtex
@inproceedings{jo2025preliminary,
  title     = {Preliminary Study on Sarcopenia Detection through Motion Analysis and Joint Torque Estimation},
  author    = {Jo, Jaebeom and Kim, Kihyun and Ryu, Kanghyun and Kang, Min-gu and Ha, Junhyoung and Kang, Jiyeon},
  booktitle = {Proceedings of KRoC 2025},
  address   = {Gangwon, Korea},
  month     = feb,
  year      = {2025},
  note      = {Oral}
}
```
