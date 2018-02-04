---
layout: post
title: A Chatroulette-Style Turing Test
---

Abstract: *We introduce a novel [Chatroulette](https://en.wikipedia.org/wiki/Chatroulette)-style training environment using human-human, human-computer, and computer-computer [Turing tests](https://en.wikipedia.org/wiki/Turing_test). Players compete in a text-based [coordination game](https://en.wikipedia.org/wiki/Coordination_game) whose goal is to correctly identify their correspondent and simultaneously avoid being identified. Players communicate through instant messages.*

## Introduction

The success of supervised learning (SL) is often attributed to the widespread availability of human-labeled [datasets](https://en.wikipedia.org/wiki/List_of_datasets_for_machine_learning_research). One such dataset, called [ImageNet](http://www.image-net.org/) has fueled a tremendous amount of research in visual object recognition over the last few years. In addition to the statistical value of raw data, datasets provide a  benchmark for comparing the accuracy of various algorithms, and help promote [reproducibility](www.cs.mcgill.ca/~jpineau/ICLR2018-ReproducibilityChallenge.html) in the field of machine learning. While SL datasets are often a surrogate for real world data, if [sampled](https://en.wikipedia.org/wiki/Sampling_(statistics)) and [used](https://en.wikipedia.org/wiki/Training,_test,_and_validation_sets) correctly, they can produce models that generalize extremely well in practice.

In reinforcement learning (RL), using static datasets for training is less efficient than SL. Rather than model the structure of an environment directly, RL agents typically learn a [*policy*](https://en.wikipedia.org/wiki/Reinforcement_learning#Criterion_of_optimality) for collecting rewards inside an environment. Given the high branching factor in most real-world settings, many RL datasets are gathered using a fixed policy and a limited set of trajectories through the environment. To learn good policies from these datasets, researchers can employ two broad strategies. They can try to improve a policy using trajectories from a existing policy (ex. medical trials).[^1] Or they can invest lots of time reconstruting an environment in silico (ex. driving simulators).

While these two approaches may be strictly necessary for safety-critical applications, they are imperfect approximations of real world environments. In environments where RL does not pose direct harm, we can train policies on real humans. At Google and Facebook, user [experimentation](https://research.google.com/pubs/pub36500.html) is common, but often requires an intractable number of experimental trials to yield robust models. The data-hungry nature of such methods remains an obstacle towards the wider adoption of RL in smaller business applications, however there are [several techniques](https://scholar.google.ca/scholar?as_ylo=2014&q=data+efficient+reinforcement+learning) for reducing the number of trials required to obtain robust models in practice. One technique for learning policies quickly is to use [human preferences](https://blog.openai.com/deep-reinforcement-learning-from-human-preferences/) to guide the policy search (Christiano et al., 2017).

## Rules

Let us consider the following two-player game:

 * Players are randomly matched with an anonymous human or bot.
 * Players communicate in real time via text-based instant messages.
 * Players can end the match by predicting their correspondent's identity.
    * If their prediction is correct, the predictor gains points. 
    * If their prediction is incorrect, the predictor looses points.
 * If a human predicts another human correctly, they both receive a reward.
 * If a bot correctly predicts a human, neither player receives a reward.
 * Players are matched according to skill in an ELO ranking.

The payoff matrix for this game can be summarized as follows[^2]:

{% include payoff_matrix.html %}

The relative reward is not specified here, although we can adjust the reward based on various factors, such as sentence length, unique vocabulary or number of dialog exchanges. 

The objective of the game is to identify the corresponding player, and avoid being identified by a bot, or as a bot. In order to prevent abuse [^3] and to create an even playing field, we restrict valid dialog to a small, fixed vocabulary [^4] for both players. This restriction can be relaxed as players gain points.

The game has two important features:

* Direct reward: 

## Technical details

The game is initially populated with humans, and a small set of chat bots. There is an API where developers may register their own chatbots to compete in a leaderboard-style ranking. Conversations are to be collected and hosted as a traditional supervised learning dataset. 

Due to the limited number of human players and the unlimited number of bots, there must be a rate limit on the number of games each bot is allowed to play. Furthermore, once the number of bots grows, the platform must allocate humans to bots in a way that matches humans and bots evenly, and ensures each participant competes with an equal number of humans and bots. The details of this allocation problem must be discussed.

## Variations

If we consider messages of unlimited character length, the space of valid conversations would make sampling impossible. Even restricting message length and vocabulary size, the game would still require an inaccessible amount of human input for training. One way to reduce the complexity, might be introducing "forums" with different criteria on length, content and structure. For example, we might consider games of the following format:

* Player A asks a question of length N.
* Player B is allowed a one-word reply.

*Special thanks to [Koustuv Sinha](http://koustuvsinha.github.io/) for suggesting numerous helpful improvements.*

## Footnotes

[^1]: This requires agents to learn new policies offline, or "off-policy".
[^2]: Relative rewards and penalties can be tuned to prevent score "gaming".
[^3]: Abusive behavior is common in anonymous online games (ex. [Microsoft Tay](https://en.wikipedia.org/wiki/Tay_(bot))).
[^4]: Human players could input text using a [predictive keyboard](https://en.wikipedia.org/wiki/Predictive_text) with a whitelist.