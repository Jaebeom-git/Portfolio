---
title: Tractor Full-Vehicle Simulation
titleSuffix: Development of a 30 kW Adjustable-Track Crawler Platform for Multi-Purpose Agricultural Operations
topbarTitle: Development of a 30 kW Adjustable-Track Crawler Platform for Multi-Purpose Agricultural Operations
shortTitle: Tractor Full-Vehicle Simulation
layout: research-project
subtitle: Research project on multibody dynamics simulation for tractor tire-parameter estimation
koreanTitle: 다목적 농작업이 가능한 윤거조절형 크롤러 기반 30kW급 주행 플랫폼 개발
category: Research Project
group: research
status: Ended
period: Jul. 2021 ~ Dec. 2021
startDate: 2021-07-01
endDate: 2021-12-31
year: 2021
venue: Chungnam National University Design Automation Lab
heroImage: /projects/tractor-full-vehicle-simulation/thumbnail.png
source: Research project record and local KSME 2021 poster material
keywords: tractor, multibody dynamics, tire model, tire parameter estimation, Magic Formula, RecurDyn, full-vehicle simulation, CNU, 트랙터, 다물체 동역학, 타이어 모델, 주행 플랫폼
---

농작업용 주행 플랫폼의 차량 응답 분석과 타이어 모델 계수 추정을 위해 다물체 동역학 기반 full-vehicle simulation model을 개발한 연구과제입니다.

## Overview

This research project developed a multibody dynamics model for a 30 kW agricultural driving platform and used simulation to support tractor tire-parameter estimation. The work focused on building a full-vehicle tractor model, reproducing towing and turning responses, and linking vehicle-level simulation results with tire-model parameters.

The poster material presents a tractor and tire modeling workflow based on RecurDyn, Magic Formula tire modeling, towing-force simulation, steering-radius simulation, and comparison between experimental response data and simulation results.

![Tractor full-vehicle simulation project summary](/projects/tractor-full-vehicle-simulation/tractor-full-vehicle-simulation-project-summary.png)

## Contributions

- Developed a multibody dynamics model of a tractor full-vehicle system using RecurDyn.
- Modeled tractor body, wheel shaft, steering, tire, and bushing components for vehicle-response simulation.
- Built towing-force simulation cases to estimate longitudinal tire-related parameters.
- Built steering-radius simulation cases to study lateral tire behavior and turning response.
- Supported tire-parameter estimation by comparing experimental vehicle-response data with simulation outputs.

## Related Publications

### Domestic Conference · Nov. 2021 · Poster

**트랙터 타이어 모델 계수 추정을 위한 다물체 동역학 해석 모델 개발**<br />
Development of a multibody dynamics model for parameter estimation of tractor tire model<br />
Chang-Ho Lee, Jae-Beom Jo, Sung-Soo Kim, KSME Annual Meeting, Gwangju, Korea, Nov. 2021.

#### Links

- Scholar: https://scholar.google.com/citations?view_op=view_citation&hl=ko&user=e8txR3gAAAAJ&citation_for_view=e8txR3gAAAAJ:d1gkVwhDpl0C

#### Abstract

Tractor tire behavior strongly affects towing force, steering response, acceleration, braking, and ride behavior, but agricultural tractor tires are difficult to characterize through simple single-tire experiments. This presentation developed a RecurDyn-based multibody dynamics model for tractor tire-parameter estimation. The model combined full-vehicle tractor modeling with Magic Formula tire modeling and used towing and turning simulations to relate tire parameters to vehicle response.

#### Poster

![KSME 2021 poster for tractor tire model parameter estimation using multibody dynamics](/projects/tractor-full-vehicle-simulation/ksme-2021-tractor-tire-model-poster.png)

#### Citation

```bibtex
@inproceedings{lee2021tractor,
  title     = {Development of a multibody dynamics model for parameter estimation of tractor tire model},
  author    = {Lee, Chang-Ho and Jo, Jae-Beom and Kim, Sung-Soo},
  booktitle = {Proceedings of KSME Annual Meeting},
  address   = {Gwangju, Korea},
  month     = nov,
  year      = {2021},
  note      = {Poster}
}
```
