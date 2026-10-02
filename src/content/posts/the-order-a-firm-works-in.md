---
title: "The order a firm works in"
description: "Most AI tools for audit start at the interesting part. The work starts three steps earlier, and that is where it goes wrong."
date: 2026-07-22
author: "Syntexia"
---

Ask a software vendor to show you AI for audit and you will be shown the fieldwork. Documents read, balances tied, exceptions raised. It demonstrates well, because it is the part that looks like work.

A partner in a Portuguese firm does not start there. They start with a question that has nothing to do with documents: should we take this client at all, and can we prove we asked.

## Acceptance is not paperwork before the work

In a statutory audit, acceptance is not a formality that precedes the engagement. It is the engagement's foundation, and it carries its own evidence requirements.

Before a single balance is opened, the firm has to establish who the beneficial owners are, whether anyone in the structure is politically exposed, whether the money-laundering risk calls for simplified or enhanced measures, and whether taking the fee would push the firm past its own independence threshold. Each of those questions has an answer, a date, and a document behind it.

Get this wrong and nothing downstream matters. The fieldwork can be immaculate and the file still fails, because the firm cannot show it was entitled to sign.

## What that means for software

It means the interesting part cannot start until the boring part is concluded. Not "should not". Cannot.

The systems we build enforce that as a state machine rather than a recommendation. Fieldwork stays locked, entity by entity, until acceptance and the anti-money-laundering assessment are concluded. A conclusion carries the date it was reached, because a chronology of dated conclusions is what audit evidence actually is. You cannot conclude on Tuesday using a document that arrived on Thursday.

This is unglamorous, and it is the part that decides whether the software is usable. A tool that lets a team skip ahead is not saving them time. It is building a file that will not hold.

## The rules are not universal, and that is the point

Here is what makes this genuinely difficult, and what most tools get wrong by design.

Two firms in the same city, both statutory auditors, both under the same law, will assess money-laundering risk differently. One uses a fixed set of yes-or-no questions where a single answer in the second half forces enhanced measures. Another uses a weighted score. Both are defensible. Both are documented. Neither is the other.

The independence thresholds move too, depending on whether the entity is a public-interest entity. The approval matrix depends on how many partners the firm has.

A product that ships one opinion of how audit acceptance works will be wrong at the second client. So we do not ship the rules. We ship the machinery, and the rules come from the firm: their questionnaire, their thresholds, their templates, their approval matrix. The architecture is reused between clients. Nothing else is.

## Where Syntexia actually helps

Once the order is respected, the useful work is obvious and narrow.

Reading the permanent record and the ownership structure. Pre-filling the questionnaire from what those documents say. Flagging the entry that pushes a threshold. Assembling the annex in the firm's own format, ready to be reviewed.

Syntexia prepares the file. The partner validates it. Nothing is concluded without a person signing it, and nothing is written back into the firm's audit software by us.

That division is not a limitation we accepted reluctantly. It is the only version of this that survives a review.
