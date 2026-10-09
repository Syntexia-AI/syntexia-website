---
title: "The number that is almost right"
description: "In regulated work, the dangerous answer is not the one that is obviously wrong. It is the one that looks fine."
date: 2026-08-14
author: "Baptiste Bouault"
topic: "Practice"
---

During testing, a system I had built answered a question about a single store with a correct number. The arithmetic was right. The data was real. The number was the total for the whole network.

Right calculation, real data, wrong scope. Nothing flagged it. If you do not know the figures by heart, that one goes straight through.

## The failure everybody prepares for is the wrong one

Ask anyone what the risk is with a language model and you will hear the same word: hallucination. The model invents a source, fabricates a case, produces a figure out of nothing. It is a real failure, and it is the one every buyer asks about.

It is also the easy one. An invented number usually looks invented. A citation that does not exist can be checked. The obviously wrong answer gets caught, because someone downstream reads it and stops.

The answer that is almost right does not get caught. It arrives with exactly the same confidence as everything else. It sits in a report, someone makes a decision on it, and nobody questions it, because there is nothing to question. It looks fine.

## Why this matters more in audit than anywhere else

In most software, an approximate answer degrades gracefully. A recommendation is slightly off. A forecast is a little wide. The user adjusts.

In an audit file, there is no graceful degradation. A figure is either the one that belongs in the working paper or it is not. A conclusion is either supported by the evidence attached to it or it is not. The reviewer three months later, or the regulator two years later, is not reading your reasoning. They are reading a number and the document behind it.

This is why an almost-right answer costs more than no answer at all. No answer is a gap, and a gap is visible. An almost-right answer is a hole with a floor painted over it.

## What we changed because of it

That single bug taught me more than the rest of the build. It moved the question from "how accurate is the model" to "what is the model allowed to do at all".

Three things came out of it, and they are now in every system we ship.

**The model does not compute.** Deterministic engines do the arithmetic. The figures are calculated and locked before the model sees them. The model writes around numbers it cannot change. It has no opportunity to be almost right, because it is never the one doing the maths.

**Nothing reaches the screen without an automated check.** If the check fails, the user gets a plain summary instead of a polished answer. A visibly incomplete output is safer than a confident wrong one.

**Every system is tested on both failure modes.** Not only "does it ever give a false answer", but also "does it ever refuse a question it should have answered". You need both. A system that never says no will eventually lie to you. One that says no too often gets ignored, and an ignored control protects nobody.

## The part that is not a technical problem

Making a model do something impressive takes an afternoon. Building something you can leave alone with a firm's files is a different exercise, and most of it is not about the model.

It is about deciding, before you start, what the machine is not allowed to do. That list is shorter than the list of what it can do, and it is worth more.
