---
title: Joint torque estimation from daily living motion for passive sarcopenia monitoring in older adults
shortTitle: MAISE / CoP-Limiter
subtitle: Physically plausible ground-reaction-force estimation for motion-based joint torque analysis
layout: paper-cop-limiter
category: Paper
isPaper: true
status: Published
period: 2023 ~ 2026
startDate: 2023-08-01
endDate: 2026-04-05
year: 2026
published: 2026-04-05
publishedLabel: Published online April 5, 2026
venue: Journal of NeuroEngineering and Rehabilitation
source: Git project page / Notion paper project
doi: 10.1186/s12984-026-01962-3
codeUrl: https://github.com/Jaebeom-git/cop-limiter
heroImage: /projects/cop-limiter/figure-1-app.png
authors: [Jaebeom Jo, Kihyun Kim, Min-gu Kang, Kanghyun Ryu, Junhyoung Ha, Jiyeon Kang]
keywords: MAISE, sarcopenia, joint torque estimation, CoP-Limiter, ground reaction force estimation, biomechanics, older adults, motion analysis, cop-limiter
---

MAISE is a passive, camera-based framework for estimating lower-limb joint torque from daily movement. This repository implements the CoP-Limiter and the GRF-estimation modules used to provide physically plausible force inputs for downstream torque analysis.

## Abstract

From daily motion to task-specific torque assessment in **MAISE**

A compact summary of Motion-AI Integrated Surveillance for the Elderly (MAISE) and the CoP-constrained GRF-estimation module implemented in this repository.

Sarcopenia is associated with falls, disability, hospitalization, and mortality, yet early assessment still depends largely on indirect measures that are difficult to deploy continuously. The paper proposes MAISE as a passive, camera-based framework that estimates lower-limb joint torque from natural daily movement.

To make that torque analysis feasible without force plates, the study introduces a CoP-Limiter that constrains the predicted center of pressure during ground reaction force estimation. The constraint keeps the estimate physically plausible and improves robustness on movements that were not seen during training.

In the older-adult evaluation reported in the paper, the framework was tested on four functional tasks that were not part of the training data. The resulting torque measures—Peak Torque, Rate of Torque Development, and Power Range—showed task-specific and joint-specific relationships with conventional sarcopenia indicators such as grip strength, gait speed, and chair-stand performance.

## Paper

Why **MAISE** matters, how it was evaluated, and what the torque plots show

Selected figures from the paper summarize the clinical motivation of the study, the task protocol used for evaluation, and the torque-level findings that connect the framework to sarcopenia-related functional assessment.

### Figure 1 · MAISE framework overview

![Overview of the MAISE framework for passive sarcopenia monitoring and joint torque estimation](/projects/cop-limiter/figure-1-app.png)

Figure 1 presents the overall framework of MAISE, showing how daily movement can be linked to lower-limb torque analysis for functional sarcopenia assessment.

### Figure 2 · Functional task protocol

![Illustrations of the functional tasks used in the MAISE paper including chair stand, pick-up, and step-up](/projects/cop-limiter/figure-2-tasks.png)

The evaluation uses four functional tasks—5-times Chair Stand, Chair Stand, Pick-Up, and Step-Up—chosen as simple, safe movements that reflect daily function in older adults.

### Figure 9 · Joint torque comparison across tasks

![Joint torque comparison between healthy and sarcopenia groups across functional tasks](/projects/cop-limiter/figure-9-torque-comparison.png)

Figure 9 compares ankle, knee, and hip torque profiles across tasks in healthy and sarcopenic groups, highlighting task-specific functional deficits and compensatory patterns.

## Implementation

How this repository implements the CoP-constrained core of **MAISE**

Selected implementation-related figures from the paper and appendix focus on the CoP-Limiter and the motion-based GRF-estimation pipeline implemented in this repository.

### Figure 4 · Virtual Foot Boundary

![Virtual Foot Boundary used by the CoP-Limiter to constrain center of pressure predictions](/projects/cop-limiter/figure-4-vfb.png)

Figure 4 describes the Virtual Foot Boundary (VFB), which defines the physically plausible support region used by the CoP-Limiter.

### Figure 5 · Model and learning pipeline

![Model diagram showing the motion-to-force estimation pipeline and CoP-Limiter component](/projects/cop-limiter/figure-5-model.png)

Figure 5 shows the GRF-estimation model, including the CoP-Limiter, the regression head, and the overall pipeline used in the implementation.

### Figure 11 · Qualitative comparison of BL and CL

![Animated qualitative comparison between baseline and CoP-Limiter models using the Transformer architecture](/projects/cop-limiter/figure-11-qualitative-results.gif)

Figure 11 compares the Baseline (BL) and CoP-Limiter (CL) models with Transformer, showing Ground Truth in red, the estimated GRF in blue, and the VFB in green. The CL model keeps the CoP inside the VFB more consistently in both validation and unseen test examples.

## Citation

If this project is useful in your work, please cite the paper and refer to this repository as the implementation companion.

```bibtex
@article{jo2026joint,
  title   = {Joint torque estimation from daily living motion for passive sarcopenia monitoring in older adults},
  author  = {Jo, Jaebeom and Kim, Kihyun and Kang, Min-gu and Ryu, Kanghyun and Ha, Junhyoung and Kang, Jiyeon},
  journal = {Journal of NeuroEngineering and Rehabilitation},
  year    = {2026},
  doi     = {10.1186/s12984-026-01962-3}
}
```
