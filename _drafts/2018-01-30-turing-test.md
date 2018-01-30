---
layout: post
title: A Chatroulette-Style Turing Test
comments: true
---

Abstract: *We introduce a novel [Chatroulette](https://en.wikipedia.org/wiki/Chatroulette)-style training environment using human-human, human-computer, and computer-computer [Turing-tests](https://en.wikipedia.org/wiki/Turing_test). Players compete in a text-based [coordination game](https://en.wikipedia.org/wiki/Coordination_game) whose goal is to correctly identify their correspondent and simultaneously avoid being identified. Players communicate through instant messages.*

The success of supervised learning (SL) is often attributed to the widespread availability of human-labeled [datasets](https://en.wikipedia.org/wiki/List_of_datasets_for_machine_learning_research). One such dataset, called [ImageNet](http://www.image-net.org/) has fueled a tremendous amount of productive research in visual object recognition over the last few years. Beyond the usefulness of the raw data itself, datasets provide a useful benchmark for comparing the accuracy of various algorithms, and help promote [reproducibility](www.cs.mcgill.ca/~jpineau/ICLR2018-ReproducibilityChallenge.html) in the field of machine learning. While such datasets are often a surrogate for real world data, if [sampled](https://en.wikipedia.org/wiki/Sampling_(statistics)) and [used](https://en.wikipedia.org/wiki/Training,_test,_and_validation_sets) correctly, they can produce models that generalize extremely well in practice.

In reinforcement learning (RL), using static datasets for training is somewhat less efficient than SL. Rather than learn the structure of an environment directly, RL agents typically learn a [*policy*](https://en.wikipedia.org/wiki/Reinforcement_learning#Criterion_of_optimality) for finding rewards inside an environment. Given the high branching factor in most real-world settings, many RL datasets are collected using only a fixed policy and a narrow set of trajectories through the environment. To learn policies from these datasets, researchers can employ two broad strategies. They can try to infer a good policy using trajectories from a fixed policy (ex. medical trials). This approach requires agents to learn real-world policies offline, or "off-policy". Or they can invest a large amount of time building an environment in silico (ex. driving simulators).

While these approaches may be necessary for safety-critical applications, they are imperfect approximations of real world environments. In environments where RL does not pose direct harm, we can train policies on real humans. At Google and Facebook, user [experimentation](https://research.google.com/pubs/pub36500.html) is common, but often requires an intractable number of experimental trials to yield accurate models. The data-hungry nature of such methods remains an obstacle towards the wider adoption of RL in smaller business applications, however there are [several techniques](https://scholar.google.ca/scholar?as_ylo=2014&q=data+efficient+reinforcement+learning) for reducing the number of trials required to obtain robust models in practice. One technique for improving policy-evaluation is to use [human preferences](https://blog.openai.com/deep-reinforcement-learning-from-human-preferences/) to guide the policy search (Christiano et al., 2017).

Let us consider the following two-player game:

 * Players are randomly matched with an anonymous human or bot.
 * Players can communicate in real time via text messages.
 * A player can end the match by predicting their correspondent's identity.
    * If their prediction is correct, the predictor gets a reward. 
    * If their prediction is incorrect, the predictor gets a penalty.
 * If a human predicts another human correctly, they both receive a reward.
 * If a bot correctly predicts a human, neither player receives a reward.
 * Players are matched according to skill in an ELO ranking.

The payoff matrix for this game can be summarized as follows:

{% include payoff_matrix.html %}

The objective of the game is to correctly identify of the corresponding player, and avoid being identified by a bot. In order to prevent exclusive voabulary, we restrict acceptable words to a small, fixed vocabulary set. The game is initially populated with humans, and a single chatbot. There is an API where developers may register their own chatbots to compete in a ranking system. Conversations between human pairs can be used as a traditional dataset, while machines can evaluate new dialog policies on real human beings.


{% if page.comments %}  
{% include disqus.html %}
{% endif %}