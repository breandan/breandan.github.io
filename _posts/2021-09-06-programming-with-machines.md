---
layout: post
title: Programming in the Age of Intelligent Machines

---

# Introduction

Since the invention of modern computers in the mid 20th century,
computer programming has undergone a number of paradigm shifts. From the
rise of functional programming to dynamic and object-oriented
programming, to the availability of myriad tools and frameworks -- its
practitioners have witnessed a veritable Renaissance in the art of
computer programming. With each of these paradigm shifts, programmers
have realized new conceptual frameworks for expressing their ideas more
clearly and concisely.

Over the last few years, a new paradigm shift has been set in motion,
with significant implications for how we think about and write programs
in the coming century. By most measures, computers have grown steadily
more intelligent and capable of assisting programmers with mentally
taxing chores. For example, intelligent programming tools (IPTs) powered
by neural language models have this year helped over 10 million people
program computers. As IPTs help digitally illiterate communities to
discover their innate aptitude for programming, this population will
continue to increase.

Computer programming is a uniquely creative exercise among the range of
human activities. It channels our innate linguistic, logical,
imaginative, and social abilities to bring abstract ideas into reality,
and ultimately, gives humans the freedom to create new realities of
their own design. In collaboration with other humans and the increasing
participation of IPTs, vast and elaborate virtual worlds are being
manufactured, where the majority of humankind now chooses to spend their
lives. With the expanding opportunities these new digital frontiers
offer, their population too will continue to grow.

Today IPTs share an equal role in shaping many aspects of computer
programming, from knowledge discovery to API design, and program
synthesis to validation and verification. However, this balance is
shifting beneath our feet. Once its creators, programmers are now
primarily consumers of information provided by an IPT, and increasingly
rely on them to perform their daily work. **With the unique
opportunities and risks this partnership presents, what division of
labor should exist between humans and our new coding collaborators?**
This is the question we have set out to understand in the following
literature review.

# Code Completion and Program Synthesis {#sec:autocompletion}

Programming researchers have long held an interest in using intelligent
tools to help them write programs [@bras1993artificial]. Due to
fundamental limitations in data and processing power, many of these
ambitions have come to pass only recently, thanks to the availability of
*big code* [@allamanis2018survey], the development of differentiable
programming libraries for gradient-based
learning [@baydin2018automatic], and attention-based language
models [@vaswani2017attention], among other technical achievements.
Armed with this new repertoire, programming researchers have revisited
their interest in IPTs. Naturally, one of the first applications
considered was code completion.

Following their initial success in natural language, rapid progress
continues to be made in the application and specialization of
transformers to source code, as well as industrial transfer where this
technology is now trained and deployed on millions of programmers
worldwide [@chen2021evaluating]. Given a natural language description of
an incomplete method, these models are capable of inferring programmer
intent and completing multiline code snippets.

The problem comes down to a question of grammar induction. Based on
empirical results, fixed-precision transformers (e.g. GPT-2, BERT) are
thought capable of recognizing the class of counter
languages [@bhattamishra2020ability], i.e., somewhere between
context-free and context-sensitive, although this characterization
requires a more careful theoretical analysis. For source code typically
stored on GitHub, this class would appear to suffice -- models trained
on such datasets are currently capable of sketching rudimentary programs
and boilerplate code, however more complex fragments require additional
oversight.

An important shortcoming of imitation learning is the question of data
provenance: even if the training data is syntactically well-formed,
constraints on the class of valid programs are ill-posed. As a result, a
large fragment of languages generated may be syntactically valid but
semantically unsound, i.e., may throw runtime errors, or appear to work
at first, but are in fact broken in a subtle manner. Like most language
models of its kind, errors in the training data are prone to be
inherited and reproduced by an IPT.

The vast majority of modern programming consists of writing ceremonial
boilerplate, tasks for which neural language models are well-suited. A
tremendous amount of human labor is spent on such chores, and
redirecting attention towards more intellectually stimulating tasks may
encourage a larger demographic to become programmers who would otherwise
lack the patience or interest. By removing these barriers, programmers
can more quickly arrive at the rewarding parts of program design and
implementation.

Nevertheless, imitation is a somewhat dissatisfying approximation to
programming from a computer-scientific perspective -- lacking in some
essential aspect the qualities its practitioners aspire to fulfill.
Helpful though it may be for tedious chores, the art of programming is
not in reading gigabytes of code and minimizing a cross-entropy loss.
Programming requires imagination, problem-solving -- qualities which
cannot be conferred by scaling existing models with more data and
parameters. What could be missing?

Computer scientists have long pondered the nature of search. Search is
an indispensable tool in the programmer's repertoire and goes to the
heart of many fundamental problems in artificial intelligence, from
classical to statistical optimization, and information retrieval to
computational linguistics. Programming itself can be seen as a kind of
search-based optimization problem [@alur2018search], consistent with its
original mathematical interpretation, e.g., linear or stochastic
programming. Coupled with a grammatical template, one could imagine
searching through the space of valid programs to produce a higher-order
function satisfying some criteria. Indeed, this exact setup is studied
in the annual syntax-guided synthesis (SyGuS)
competition [@alur2016sygus].

Returning to our earlier question of, "What else could human programmers
be doing besides imitation learning?", one plausible answer could be
trial and error. Given a program specification and a computational
budget, a naïve strategy could be to simply evaluate as many programs
from a dataset of candidate solutions as possible within the allotted
budget. Many programmers do in fact practice this style of copy-paste
programming as evidenced by duplicate code studies [@lopes2017dejavu], a
problem known to adversely bias machine learning models, and which must
be corrected for during data curation [@allamanis2019adverse].

For most practical programming languages, the space of valid programs
can hardly be enumerated, never mind evaluated in a reasonable amount of
time. A more refined strategy is needed: for example, we could select a
small set of reusable building blocks, then compose and evaluate partial
programs using an execution-guided
scheme [@chen2018execution; @wang2018execution]. By interacting with an
interpreter, we may be able to arrive at a solution via incremental
improvement. As with most dynamic programming algorithms, the problem
comes down to a question of substructure: unless the problem can be
decomposed into overlapping subproblems, program search can be
exponential or worse.

For example, many useful programs belong to the class of context free
languages. Sampling is possible using a probabilistic grammar, but at
what cost? The number of distinct parse trees grows super-exponentially
with height. Various strategies have been designed to inhibit this
growth, but even with judicious pruning, the topology of many languages
does not admit search, or the cost required may be prohibitive. Yet
humans are able to solve many computationally hard search problems with
deceptive ease. How?

One possibility is that humans possess more computational resources than
might we give them credit for, and a similarly-enriched neural-guided
search would be equally capable. Another hypothesis is that we are not
*searching* for programs per se: when painting a portrait or writing a
novel, we do not call this search. Likewise, **programming is not
necessarily about searching for an answer, but finding the right
question, of exploring a design space whose specification is a
consequence, not a catalyst of the design process.** The program's
source code could merely be an artifact of an ephemeral dialog between a
human and a machine, not the final result. In the following section, we
explore two contrasting models for this dialog, one where the human is
the teacher and one where the IPT is the teacher.

# Declarative and Automatic Programming {#sec:automatic-and-declarative-programming}

In The Art of Computer Programming [@knuth1997art], Donald Knuth
memorably writes, "Programs are meant to be read by humans and only
incidentally for computers to execute." Taking this perspective, one may
be tempted to ask, "**Why must programming languages be so difficult
that we need IPTs to write down our ideas in the first place?**" If we
consider programming to be simply a matter of communicating human intent
to machines, language designers should take great pains to simplify the
language so that users may convey their intent in an effortless manner,
then harness machine intelligence in the service of fulfilling that
intent, rather than force the user to give precise instructions. Known
as *declarative programming*, this approach can be found in languages
like SQL, Prolog, and miniKanren.

The essence of declarative programming can be traced back to the 1940s
when researchers started applying tools from mathematical optimization
to what is today known as operations
research [@kantorovich1960mathematical]. In this early work, programmers
would state their intent as a solution to a system of inequalities,
e.g., for optimal transport or economic planning. More recently, it has
found important applications for defining metrics on probability
distributions, the construction of which are an essential aspect of
machine learning. Metrics provide a way of biasing learning algorithms
towards solutions of a certain form, and thus can be seen as an indirect
form of programming.

Not only can declarative programming be used to produce numerical
solutions to systems of equations, but the same ideas can be applied to
synthesize other kinds of data, such as programs. Given some existing
program $\mathcal P$ and a set of declarative constraints in the form of
program transformations, we could construct an *adjoint* program
$\mathcal P'$ by applying the transformations recursively. For example,
this might allow us to approximate a probability density function, or
compute its derivative with respect to one or more inputs. These
techniques are broadly known as *automatic programming*.

Our interest in automatic programming is twofold: (1) as the basis for
the first successful open-source implementation of gradient-based
learning [@baydin2018automatic], and (2) as a practical framework for
realizing the once-scorned [@dijkstra1979foolishness] but now
increasingly plausible [@chen2021evaluating] idea of natural language
programming. For example, consider the following natural language
specification:

``` {basicstyle="\\footnotesize\\ttfamily"}
fun transformStringIntoListOfUniqueWords(s: String) = TODO()
```

This is the completion provided by Codex [@chen2021evaluating], a recent
IPT from OpenAI:

``` {basicstyle="\\footnotesize\\ttfamily"}
fun transformStringIntoListOfUniqueWords(s: String) =
     s.toLowerCase().replace(Regex("[^a-zA-Z]"), " ").trim()
      .split("\\s+".toRegex()).filter { it.isNotBlank() }.toSet()
```

The problem with automatic programming is that it assumes the
specification is (1) infallible and (2) faithfully represents its
author's intent. If either assumption is invalid, the resulting output
could be nonsensical, or appear to work but actually contain a subtle
error. How could we detect such an error and provide earlier feedback if
the specification were ill-posed?

As adept as human programmers are at certain tasks, they can be
short-sighted. The larger a program grows, the more likely its author is
to make a mistake due to combinatorial explosion -- whenever a new
feature is added, it has the potential to interact with every other
feature in unpredictable ways. This is why language designers are often
hesitant to add new features, a challenge which has come to be known as
the feature-interaction problem [@apel2013exploring]. Taking this
perspective, the programmer is not an all-knowing oracle, but actually a
student who proposes ideas to the IPT, and in return, receives feedback
about their consequences in the context of a *type system*.

**When programmers ask for an intelligent programming tool, what they
really want is not a subordinate who blindly follows orders, but a tutor
who quickly gives feedback about the implications of their design
choices.** This is the advantage of having a type system: not only does
it give relevant feedback, but allows us to constrain the space of
semantically valid programs. The interaction model is bidirectional: the
user provides a typed program sketch. If the program is valid, the type
is witnessed by an inhabitant. And if the program is inconsistent, the
type system provides feedback to the user as to where and how.

For example, all procedures in a statically-typed programming language
have a *type signature*, e.g., `getHomePhone: Person → PhoneNumber`.
This represents a *contract* between the procedure and its caller: if
the procedure `getHomePhone` is called with a `Person`, it will return a
`PhoneNumber`. All other input and output types are forbidden by the
type system.

What if we could encode the type system constraints into our neural
language model -- how would we go about doing that? One way is to use
neural guided search, where we do beam search over a generative language
model and discard the programs which are not well-typed. The second way
is more difficult, but morally proper: we learn a probability
distribution on the space of semantically correct programs from the
outset, so the resulting samples are always valid programs and rejection
becomes unnecessary. Broadly speaking, this approach is known as
type-safe probabilistic programming, and has been considered for various
applications, for the analysis of cryptographic algorithms, to physical
simulation, to Bayesian program learning [@murali2017bayesian].

# Knowledge-based Programming {#sec:knowledge-based-programming}

Historically, most knowledge was stored as natural language. A growing
portion is now *code* [@allamanis2018survey]. The majority of code is
procedural knowledge, written by a human and intended to operate a
machine. Though it shares many statistical properties in common with
natural language [@hindle2012naturalness], code has an unambiguous
grammar and well-defined semantics [@pierce2010software]. We can use
these properties to construct graphical models and reason about their
structure.

Early work in program learning realized the importance of graph-based
representations [@allamanis2017learning], however explicit graph
construction requires extensive feature-engineering. More recent work in
program synthesis has explored incorporating a
terminal [@ellis2019write], graphical [@walke2020learning] or other user
interface to explore the space of valid programs, however they do not
consider the scope or variety of artifacts in a software project. Others
have shown the feasibility of learning a local
graph [@johnson2020learning] from source code, but still require an
explicit parser to form the initial graph. Moreover, adaption to
settings where style, terminology and document structure vary remains a
challenge.

Application programming interfaces (APIs) are interfaces which describe
available ways of structuring computation to achieve related programming
tasks. We call the graph of all possible ways to compose an API the *API
surface*. One traverses the API surface by composing accessible
procedures in a *call graph*. Thus, we can view the API as a kind of
*procedural knowledge base* representing common data transformations and
how to compose them. In practice, how to achieve some desired goal is
often far from obvious, requiring a large amount of documentation to
explain.

Many consumers of popular APIs publish code and documentation in open
source repositories, a largely untapped source of knowledge for
programming tools. New work seeks to find ways of linking knowledge
contained in open source repositories to help users locate examples and
compose programs. In the following section, we review three applications
for document alignment (§ [4.1](#subsec:tracelink){reference-type="ref"
reference="subsec:tracelink"}), code search
(§ [4.2](#subsec:code-search){reference-type="ref"
reference="subsec:code-search"}), and knowledge extraction
(§ [4.3](#subsec:knowledge-extraction){reference-type="ref"
reference="subsec:knowledge-extraction"}).

## Documentation alignment {#subsec:tracelink}

Documentation is an indispensable resource for software developers
learning to use a new API or programming language. Maintainers of
popular software projects often publish web-based developer documents,
typically in markup languages such as HTML or Markdown. These documents
contain a mixture of natural language sentences, code snippets, and
hyperlinks to related documents and source code files. All of these
artifacts hold rich semantic information: the markup graph describes the
text in relation to other entities in the document hierarchy, while the
link graph describes relationships between relevant documents or
artifacts in a software repository.

Consider the typical workflow of a software developer who is seeking
information about an unfamiliar API. To effectively locate relevant
documentation, a specific fragment of text (e.g., a function name, error
message, or identifier) must first be copied from a development
environment into a search engine, providing relevant contextual
information. The query must be descriptive enough to retrieve relevant
documents with high probability, while omitting extraneous information
(e.g., user-defined tokens) unlikely to occur outside the scope of the
developer's personal environment or project.

Prior work in information retrieval for software development
investigated recommending API documentation [@robillard2015recommending]
and Q&A content [@treude2016augmenting] to developers. Similar work in
natural language processing has studied the relationship between
comments and source code
entities [@iyer2018mapping; @panthaplackel2020associating] strictly
within source code. Examples of cross-domain entity linking in the
source-to-doc (S2D) and doc-to-source (D2S) setting are scarce, however
these results indicate alignment between natural language and software
artifacts may be feasible.

More recent work seeks to facilitate procedural knowledge discovery by
enriching lexical queries with semantic information extracted from a
programming environment, and prioritizing semantically relevant software
artifacts among a set of matching search results. Broadly, the tools in
this literature review can be used to study both source code and
documentation. Reasoning about relations between these artifacts will
require developing new approaches to feature engineering, unsupervised
learning and entity alignment in the low-data regime. Such an
application would allow developers to more quickly and easily locate
semantically or contextually relevant code samples in API documentation
and open source repositories. These tools could also help authors
maintain a consistent set of API documents and usage examples across a
large codebase -- a persistent obstacle for software maintenance.

## Human-mediated code search {#subsec:code-search}

Given a learned similarity metric between procedures, one
straightforward application is code search. Prior work has explored
type-directed [@james2020digging], learning-based [@gu2018deep] and
semantic [@premtoon2020semantic] code search. These techniques all use a
fixed, or synthetic ordering over search results. For a given context,
there are often many valid completions within an API or codebase. Given
a corpus of procedures in their surrounding typing environment, is it
possible to estimate a probability distribution on a shared embedding
between contexts and results, and measure the likelihood that a given
search result occurs in an empty location? This requires:

1.  Efficiently searching a corpus for a well-typed pattern

2.  Ranking the matching search results by semantic alignment

3.  Incorporating information into user's context (e.g., variable
    renaming)

Given a cursor and the surrounding context (e.g., in an IDE or editor),
such a tool would need to search a database for the most similar
contexts, extract common snippets to estimate their *concordance* or
*agreement* with the surrounding code context, then adapt the foreign
code snippet into the user's context. Public code samples,
API-documentation or version control history, could help the user to fix
some erroneous or outdated piece of code. Some open research questions
include:

1.  **Semantic segmentation**: How do we slice or truncate context?

2.  **Graph search**: What kernels enable fast subgraph detection?

3.  **Context ranking**: What features best measure contextual
    similarity?

4.  **Refactoring**: How to integrate a selected result into the user's
    code?

Other work in the code search literature explores the
text-to-code [@husain2019codesearchnet] setting, where queries are
typically considered to be a short sequence composed by the user, or
code-to-code [@kim2018facoy] setting where the query takes the form of a
code snippet. Model performance is typically evaluated using mean
reciprocal rank (MRR), mean average precision (MAP), normalized
discounted cumulative gain (NDCG), precision and recall at top N-results
(P/R\@N), or similar metrics. Although some [@asyrofi2020ausearch] do
incorporate other features from the local document, few consider the
query in the context of a broader project. The ability to align
contextual features from the surrounding project, we argue, is essential
to delivering semantically relevant search results.

## Software knowledge extraction {#subsec:knowledge-extraction}

What is a language model? Disregarding meaning, a language model is no
more than a statistical description of symbolic information. Natural
languages differ from mechanical languages in a few key ways. Natural
languages are linear: almost all human languages have a fixed maximum
recursion depth governed by biological and cognitive factors.
Programming languages, by contrast, are more strongly nonlinear due to
their metalinguistic properties. Thus, current natural language models
cannot represent many programming languages without significantly
constraining their expressiveness. Prior studies of source code have
been
undertaken [@weiss2018practical; @chirkova2020empirical; @chen2021evaluating]
to characterize the families of computational languages that neural
language models can recognize. These studies rely on statistical
analysis of code corpora, but do not provide tight bounds on the
expressiveness of neural language models.

One might argue -- since natural language models are effectively linear
-- a language model with a large enough working memory, given enough
data, should be able to model language fragments whose description
lengths fit inside their working memory. Indeed, studies show that
natural language models are surprisingly adept at modeling idioms in
source code. However, we would expect such models to struggle with
fragments whose complexity exceeds its working memory (e.g., whose
average MDL stretch this limit).

What is the difference between working memory, i.e., reasoning, and
long-term memory, i.e., knowledge? Long term memory is information
stored in the learned parameters, i.e., the topological structure of the
network -- as a model *learns*, this information is passively encoded in
the topological structure. Long-term memories must be conserved by the
data distribution: distributional shift tends to erase past memories, a
phenomena known as catastrophic forgetting. In contrast, short-term or
working memories are dynamical patterns of activity which allow a
network to reason about incoming signals and adapt to previously unseen
scenarios without memorization. To be propagated forward in time,
working memories must be actively conserved by the network topology.
**Both learning and reasoning are a forms of message passing over a
graphical structure: learning shapes the graph topology, and reasoning
propagates signals through it.**

Models which cannot fit a computational language into working memory
must learn maximal-length fragments and use long-term memory to fill-in
the gaps -- i.e., by memorizing transitions between fragments in
long-term memory. If this is the case, we would expect to find
transitions that are locally consistent, but globally incoherent. For
instance, can source code models learn balanced parentheses? Balanced
intermingled parentheses? `{([])}` Other algebraic datastructures (e.g.,
bushes, imbalanced trees, etc.)? What are the limit languages that can
be learned by natural language models of source code (e.g.,
transformers, RNNs) and their failure modes in practice?

Finally, can we extract any useful knowledge from a trained language
model? Two high-level strategies have been proposed in recent
literature: we could either decode a useful representation, such as a
finite [@weiss2018extracting] or weighted finite
automaton [@weiss2019learning] from a pretrained neural language model
using queries and counterexamples a la Angluin [@angluin1987learning],
or we could train a model to directly synthesize a graph using a
reinforcement learning based approach [@johnson2020learning]. While
early results appear promising, further investigation is required to
understand the tradeoffs between these two approaches.

# Conclusion

The last few years have shown a variety of different interaction models
between humans and IPTs. One potential future is that human beings will
be eventually left behind in the race for higher forms of intelligence
(computer scientists are largely divided over this topic). Regardless
whether such a thing will come to pass, we will need new tools for
humans to communicate their values and preferences effectively. How can
we convince machines to use their intelligence in service of our mutual
good, whilst giving them agency to explore solutions that we may not
understand? This question is broadly known as the AI alignment
problem [@kim2018mimetic; @christian2020alignment] and is attracting an
interest from both the computing sciences and humanities.

**Our position is that alignment will require a closer collaboration
between computer science and humanities than historically practiced, and
this partnership will be invigorating for both disciplines.**

One way of ensuring that our values are faithfully encoded by machines
is through *programming*. In this literature review, we give various
examples of programming models that have been envisioned, e.g., from
autocompletion and program synthesis
(§[2](#sec:autocompletion){reference-type="ref"
reference="sec:autocompletion"}), to autoprogramming and type inference
(§[3](#sec:automatic-and-declarative-programming){reference-type="ref"
reference="sec:automatic-and-declarative-programming"}). Another way to
propagate human values is by teaching the humanities: arts, language,
culture, history and philosophy. By keeping these traditions alive, we
transmit our cultural heritage to future generations so that they, by
studying the lessons of our past, may avoid repeating the same mistakes.
Those generations may soon be enlisted to help share our values with
computers.

Given the clear and present risks associated with misuse, great care
must be taken to ensure that intelligent systems do not bring harm into
the world. For this reason, we encourage the careful study of
programming language theory, which helps ensure the safety, security and
energy efficiency of computer programs and statistical learning theory,
which has developed tools like risk minimization and probabilistic
programming to reason about uncertainty.

# Acknowledgements

The author wishes to thank his advisors Jin Guo and Xujie Si, for their
feedback on this literature review, colleagues Disha Shrivastava and
David Yu-Tung Hui, for sharing their ideas about natural language and
philosophy, and Pratheeksha Nair and Ian Porada for helping prepare for
his oral exam.
