---
title: Reinforcement-Learning-Driven Automatic Scaling in OpenSim for Enhanced Human Motion Analysis
shortTitle: RL-Driven Automatic Scaling
subtitle: ICROS 2025 poster on reinforcement-learning-driven OpenSim scaling for human motion analysis
koreanTitle: 강화학습 기반 OpenSim 자동 스케일링을 통한 인체 운동 분석 정확도 향상 기법
layout: poster-rl-scaling
heroEyebrow: Domestic Conference + Poster
abstractHeading: Reinforcement-learning-driven model scaling in OpenSim
posterHeading: ICROS 2025 poster
citationIntro: The manuscript is currently in preparation. For now, cite the conference poster and the related master’s thesis as appropriate.
category: Domestic Conference
group: research
status: Poster · Manuscript in preparation
period: Jun. 2025
startDate: 2025-06-01
endDate: 2025-06-26
year: 2025
venue: ICROS 2025, Jeonju, Korea
paperUrl: https://scholar.google.com/scholar?cluster=8564687932397157900&hl=ko&as_sdt=0,5
codeUrl: https://github.com/Jaebeom-git/rl-scaling.git
showLinks: true
heroImage: /projects/reinforcement-learning-driven-automatic-scaling/thumbnail.png
source: Conference poster
authors: [Jaebeom Jo, Jiyeon Kang]
keywords: reinforcement learning, automatic scaling, OpenSim, human motion analysis, biomechanics, ICROS, GIST
---

Reinforcement-Learning-Driven Automatic Scaling in OpenSim applies reinforcement learning to automate musculoskeletal model scaling for enhanced human motion analysis.

## Abstract

Musculoskeletal simulation depends on accurate subject-specific model scaling, but the scaling step still introduces a major real-to-sim gap in human motion analysis. Manual scaling is time-consuming, subjective, and difficult to reproduce, while optimization-based auto-scaling can be sensitive to initial values and local minima. These limitations can propagate into downstream analyses such as inverse kinematics, inverse dynamics, and joint-torque estimation.

This project formulates OpenSim model scaling as a reinforcement-learning problem. Instead of directly relying on manual tuning or a single optimization run, an agent learns to search for 3D scale factors that minimize marker error between experimental and virtual markers. The framework adopts a TD3-based actor-critic architecture with a Transformer network so that subject-specific context such as height, weight, and sex can be incorporated into the scaling policy.

The Transformer-based RL model achieved faster convergence than a feed-forward architecture, reduced marker errors compared with AddBiomechanics, and accelerated elderly-cohort fine-tuning through OpenCap pre-training.

## Poster

![ICROS 2025 poster for Reinforcement-Learning-Driven Automatic Scaling in OpenSim](/projects/reinforcement-learning-driven-automatic-scaling/ICROS2025_Reinforcement-Learning-Driven Automatic Scaling in OpenSim_Poster.png)


## Citation

The manuscript is currently in preparation. For now, cite the conference poster and the related master’s thesis as appropriate.

### Conference Poster

```bibtex
@inproceedings{jo2025reinforcement,
  title     = {Reinforcement-Learning-Driven Automatic Scaling in OpenSim for Enhanced Human Motion Analysis},
  author    = {Jo, Jaebeom and Kang, Jiyeon},
  booktitle = {Proceedings of ICROS 2025},
  address   = {Jeonju, Korea},
  month     = jun,
  year      = {2025},
  note      = {Poster}
}
```

### Master’s Thesis

```bibtex
@mastersthesis{jo2025joint,
  title  = {Joint Torque-based Sarcopenia Assessment in Activities of Daily Living Using a Data-driven Simulation Framework},
  author = {Jo, Jaebeom},
  year   = {2025}
}
```
