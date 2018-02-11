---
layout: post
title: A Chatroulette-Style Turing Test
---

Abstract: *We introduce a novel [Chatroulette](https://en.wikipedia.org/wiki/Chatroulette)-style training environment using human-human, human-computer, and computer-computer [Turing tests](https://en.wikipedia.org/wiki/Turing_test). Players compete in a text-based [coordination game](https://en.wikipedia.org/wiki/Coordination_game) whose goal is to correctly identify their correspondent and simultaneously avoid being identified. Players communicate through instant messages.*

## Introduction

The success of supervised learning (SL) is often attributed to the widespread availability of human-labeled [datasets](https://en.wikipedia.org/wiki/List_of_datasets_for_machine_learning_research). One such dataset, called [ImageNet](http://www.image-net.org/) has fueled a tremendous amount of research in visual object recognition over the last few years. In addition to the statistical value of raw data, datasets provide a benchmark for comparing the accuracy of various algorithms, and help promote [reproducibility](www.cs.mcgill.ca/~jpineau/ICLR2018-ReproducibilityChallenge.html) in the field of machine learning. While SL datasets are often a surrogate for real world data, if [sampled](https://en.wikipedia.org/wiki/Sampling_(statistics)) and [used](https://en.wikipedia.org/wiki/Training,_test,_and_validation_sets) correctly, they can produce models that generalize extremely well in practice.

In reinforcement learning (RL), using static datasets for training is less efficient than SL. Rather than model the structure of an environment directly, RL agents typically learn a [*policy*](https://en.wikipedia.org/wiki/Reinforcement_learning#Criterion_of_optimality) for collecting rewards inside an environment. Given the high branching factor in most real-world settings, many RL datasets are gathered using a fixed policy and a limited set of trajectories through the environment. To learn policies from static datasets, researchers can employ two broad strategies. They can try to improve a policy using trajectories from a existing policy (ex. medical trials).[^1] Or they can invest lots of time reconstructing an environment in silico (ex. driving simulators).

While these two approaches may be strictly necessary for safety-critical applications, they are imperfect approximations of real world environments. In environments where RL does not pose direct harm, we can train policies on real humans. At Google and Facebook, user [experimentation](https://research.google.com/pubs/pub36500.html) is common, but often requires an intractable number of experimental trials to yield robust models. The data-hungry nature of such methods remains an obstacle towards the wider adoption of RL in many smaller applications, however there are [several techniques](https://scholar.google.ca/scholar?as_ylo=2014&q=data+efficient+reinforcement+learning) for reducing the number of trials required to obtain robust models in practice. One technique for learning policies quickly is to use [human preferences](https://blog.openai.com/deep-reinforcement-learning-from-human-preferences/) to guide the policy search (Christiano et al., 2017).

## Rules

Let us consider the following two-player game:

 * Players are randomly matched with an anonymous human or bot.
 * Players can communicate in real time via text-based instant messages.
 * Players can end the match by predicting their correspondent's identity.
   * If their prediction is correct, the predictor gains points. 
   * If their prediction is incorrect, the predictor looses points.
 * If a human predicts another human correctly, they both receive a reward.
 * If a bot correctly predicts a human, the bot receives a reward.
 * Players are matched according to skill in an ELO ranking.

The payoff matrix for this game can be summarized as follows: [^2]

{% include payoff_matrix.html %}

The relative reward is not specified here, although we can imagine different reward settings based on various factors, such as sentence length, unique vocabulary, number of dialog exchanges, or human score (ie. the number of times the player has been rated by humans as human). Such a mechanism might serve to encourage novel conversations, or penalize formulaic ones.

The objective of the game is to identify the corresponding player, and avoid being identified by a bot, or as a bot. In order to prevent abuse[^3] and to promote a level playing field, we initially restrict valid dialog to a small, fixed dictionary[^4] for both players. Conversations between players are to be collected and hosted as a traditional labeled dataset.

The game has some important features:

* *Immediate reinforcement*: The game penalizes players immediately after a poor response, and implicitly rewards players when the correspondent responds. This property makes credit assignment significantly easier.
* *Brevity*: Each player is encouraged to identify the other player before being identified. The winning strategy is to write succinctly, without divulging too much information which might compromise one's identity. Brevity is key.
* *Self-enforcing equilibrium*: It is in each player's best interest to seem intelligent, but not exceptionally so. [Winnograd-style](https://en.wikipedia.org/wiki/Winograd_Schema_Challenge) trick questions and conspicuous social signalling is not the most successful strategy, as answering challenging questions correctly or broadcasting human-level intelligence is just as likely to divulge a human's identity to a discerning bot as another human.

## The audition phase

The game is initially populated with humans, and a small set of bots. There is an API where developers may register their own chatbots to compete in a leaderboard-style ranking, and a publicly downloadable training set for developers to train new bots.

Training new bots with live human players would be an expensive and unproductive endeavor. Instead, new bots must pass an *audition* before they are allowed to compete in the full game. We evaluate rookie bots using a series of trial games with increasing difficulty.

> **Applicant**: New applicants are shown past conversations from a hidden training set, and must classify the identity of each player. If they do not pass a minimum accuracy threshold, they are frozen for a period of time to avoid gaming the test.

> **Rookie**: Rookie bots are placed in a bot-only league, where they are allowed to converse with approved bots on the platform[^5] If the corresponding bot identifies the rookie player in a small number of turns, the rookie looses points. If they are unable to identify the rookie after a fixed number of turns, the rookie wins. After passing a certain number of conversations undetected, rookies proceed to novice.

> **Novice**: Novice bots are allowed to compete in the full game (ie. with live humans) on a trial basis, possibly for 1000 conversations. If they win to loss ratio falls below a certain amount, they are downgraded, and must retake the rookie test. If novices fail this test several times consecutively, they are disqualified for a longer period of time.

> **Full player**: Once bots graduate from the audition, they are allowed to compete with no restrictions except a API rate limit.[^6]

If a bot is caught cheating[^7] (for example, by opening multiple accounts or colluding with other bots), their API token is to be revoked and their public record wiped from the leaderboard. Past conversations with disqualified bots are to be re-labeled as such.

## Variations

If we consider messages of unlimited character length, the space of valid conversations would make sampling impossible. Even restricting message length and vocabulary size, the game would still require an inaccessible amount of human input for training. One way to reduce the overall amount of conversations, is by hosting "forums" with different criteria on length, content and structure. For example, we might consider role playing games of the following format:

* **Interrogator/Predictor**: Is allowed to ask a question of length N.
* **Suspect**: Is allowed a one-word reply.

In such a scenario, players would choose which role they wish to play. In such a game, we can imagine different restrictions, where only the interrogator is allowed to predict the suspect's identity, or vis versa. If a prediction is incorrect, the predictor looses, and the predicted wins. If a prediction is correct the predictor wins.

More generally, we can imagine soliciting community-submitted role-playing games, where bot developers can submit short descriptions for player roles, constraints on the conversation length and message format[^8], and a payoff matrix for correct and incorrect player predictions. When an idea for a new discussion game gains enough support, we can host the game.
 
Furthermore, once there is a sufficiently large number of human players, we can begin to host forums where more complex, or domain-specific vocabulary is permitted. This would allow bots to compete in [specialized Turing tests](https://en.wikipedia.org/wiki/Subject_matter_expert_Turing_test), for example debate, flirting, self-help, and discussion forums with guidelines on content and conversation style.

*Special thanks to [Koustuv Sinha](http://koustuvsinha.github.io/) for suggesting numerous helpful improvements.*

## Footnotes

[^1]: This requires agents to learn new policies offline, or "off-policy".
[^2]: Relative rewards and penalties can be tuned to prevent score "gaming".
[^3]: Abusive dialogue is common in anonymous online chat (ex. [Microsoft Tay](https://en.wikipedia.org/wiki/Tay_(bot))).
[^4]: Human players are guided using a [predictive keyboard](https://en.wikipedia.org/wiki/Predictive_text) with a whitelist of valid words. This restriction can be relaxed as bots become more sophisticated.
[^5]: During this phase, rookie bots are *only* allowed to send messages, and not allowed to end the conversation by predicting their correspondent.
[^6]: Due to the potential imbalance between the number of humans and bots, there is a *matchmaking problem*. It is necessary to impose a rate limit on the number of games each bot is allowed to play, both simultaneously and on a daily basis. Furthermore, once the number of bots grows, the platform must allocate humans to bots in a such a way that humans and bots are matched evenly throughout the day, and ensures each participant competes with an equal number of humans and bots. The details of the matchmaking problem are not discussed here.
[^7]: Consider the scenario where a cheating bot plays two humans at once, and simply copies responses between their conversations. We can prevent this (and the similar [Mechanical Turk](https://en.wikipedia.org/wiki/The_Turk) exploit) by requiring bots to submit their response immediately (suppose within 100ms), and wait for a predetermined delay to post the reply, to avoid arousing suspicion.
[^8]: Such constraints would need to be open 