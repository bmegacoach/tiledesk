<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [https://youtu.be/6bBWmnv8Q8o](https://youtu.be/6bBWmnv8Q8o)

Ok I think we have covered alot of ground in this area. but I want to update this system taking a review of this video. and We are going to build a COMPLETELY automated system with our new ChiefOS Moltworker employee system. So lets update this PRD based on these new updates in our production system.

Based on the Sabrina Ramonov video and the ChiefOS Moltworker concept, here's your **updated PRD for a fully automated AI employee system**:

***

# ChiefOS StudioForge: Moltworker AI Employee System v2.0

## Fully Automated eBook + Video Production Factory


***

## Executive Summary

The Sabrina Ramonov video demonstrates how **n8n + Blotato** creates a "faceless video factory" that can generate carousels, slideshows, and AI-narrated videos with zero manual editing. Combined with your existing ebook infrastructure, this enables a **Moltworker system**—AI agents that function as full-time employees operating 24/7.

**The Shift**: From "you operating tools" to "AI employees operating your business"

**Key Capabilities Added**:

- **Visual Agent**: Creates carousels, faceless videos, quote cards via Blotato API
- **Video Agent**: Produces 8-video marketing series per book automatically
- **Distribution Agent**: Auto-posts to Instagram, YouTube, TikTok, LinkedIn
- **Research Agent**: Finds trending niches + viral content formats dynamically

**Target**: 12 books + 96 videos (8 per book) produced annually with <5 hours/month oversight

***

## Part 1: The Moltworker Architecture

### AI Employee Org Chart

```
ChiefOS Moltworker System
│
├── 📊 RESEARCH AGENT (Niche Hunter)
│   ├── Amazon Product API (BSR analysis)
│   ├── Google Trends (demand validation)
│   ├── Reddit/TikTok (trending topics)
│   └── Output: Validated book topics + viral hooks
│
├── ✍️ WRITING AGENT (Content Creator)
│   ├── Claude API (10K word drafts)
│   ├── Perplexity API (research/citations)
│   ├── Editor sub-agent (voice consistency)
│   └── Output: Publication-ready manuscripts
│
├── 🎨 VISUAL AGENT (Asset Designer)
│   ├── Canva API (book covers, mockups)
│   ├── Blotato API (carousels, quote cards)
│   ├── Ideogram (AI-generated imagery)
│   └── Output: All visual assets
│
├── 🎬 VIDEO AGENT (Faceless Factory)
│   ├── Blotato API (video templates)
│   ├── 11 Labs API (voice synthesis)
│   ├── HeyGen (AI avatars if needed)
│   └── Output: 8-video series per book
│
├── 📢 MARKETING AGENT (Distribution)
│   ├── Meta Ads API (audience targeting)
│   ├── Blotato Post API (social publishing)
│   ├── MailerLite API (email sequences)
│   └── Output: Live campaigns + posts
│
└── 📈 ANALYTICS AGENT (Optimizer)
    ├── KDP API (sales tracking)
    ├── Stripe API (direct sales)
    ├── Meta Insights (ad performance)
    └── Output: Weekly optimization reports
```


***

## Part 2: The Automated Workflow (n8n Orchestration)

### Workflow 1: Book Production Pipeline

```yaml
Trigger: Scheduled (Weekly) OR Manual (via ChiefOS dashboard)
↓
Step 1: Research Agent
  - Query: "Find trending topics in [men's health/ex-offender reentry/philosophy]"
  - Tools: Amazon API + Google Trends + Perplexity
  - Output: 3 validated niche opportunities with BSR data
↓
Step 2: Outline Agent
  - Input: Selected topic
  - LLM: Claude (8-10 chapter structure)
  - Output: Detailed outline JSON
↓
Step 3: Writing Agent
  - Input: Outline
  - LLM: Claude (1K words/chapter)
  - Sub-agent: Editor (voice consistency check)
  - Output: 10K word manuscript
↓
Step 4: Source Agent
  - Input: Manuscript
  - Tool: Perplexity API (fact-check + citations)
  - Output: Enhanced manuscript with 20+ sources
↓
Step 5: Visual Asset Agent
  - Parallel execution:
    - Canva API: 5 cover variants
    - Blotato API: Carousel templates
    - Ideogram: Hero images
  - Output: All visual assets packaged
↓
Step 6: Formatting Agent
  - Input: Manuscript + assets
  - Tool: Pandoc/Reedsy API
  - Output: KDP-ready PDF + EPUB
↓
Step 7: Publication Agent
  - Parallel:
    - KDP API: Upload + set price ($4.99)
    - Stripe: Create product page
    - MailerLite: Setup email sequence
  - Output: Live book + sales page
↓
Step 8: Video Factory Agent
  - Input: Book manuscript
  - Sub-workflow: 8-Video Series Generator (see below)
  - Output: 8 videos ready for distribution
↓
Step 9: Distribution Agent
  - Blotato API: Post carousels to Instagram
  - YouTube API: Upload video series
  - LinkedIn API: Share article excerpts
  - Output: Multi-channel content live
↓
Step 10: Analytics Collection
  - Aggregate: Sales, email signups, video views, BSR
  - Output: Weekly performance report to ChiefOS dashboard
```


### Workflow 2: 8-Video Series Generator (Video Factory)

Based on Sabrina Ramonov's Blotato + n8n approach:

```yaml
Input: Book manuscript + target platform (YouTube Shorts/TikTok/Reels)
↓
Video 1: Hook Generator
  - AI extracts: Most controversial/painful point from book
  - Blotato template: "POV: You're [problem state]"
  - Output: 15-30 sec hook video
↓
Video 2: Story Extractor
  - AI identifies: Your personal story from manuscript
  - Blotato template: Personal narrative style
  - Output: 45-60 sec story video
↓
Video 3: Framework Reveal
  - AI extracts: Core methodology/framework
  - Blotato template: Tutorial carousel → video
  - Output: 60-90 sec educational video
↓
Video 4: Proof Compilation
  - AI gathers: Testimonials/case studies from book
  - Blotato template: Before/after format
  - Output: 30-45 sec social proof video
↓
Video 5: Objection Handler
  - AI identifies: Top 3 objections from Amazon reviews
  - Blotato template: Direct response format
  - Output: 45-60 sec objection crusher
↓
Video 6: Bonus Teaser
  - AI creates: Lead magnet preview
  - Blotato template: "Free download" style
  - Output: 30 sec value-add video
↓
Video 7: CTA/Urgency
  - AI generates: Limited-time offer language
  - Blotato template: High-energy close
  - Output: 15-30 sec conversion video
↓
Video 8: Nurture/Email
  - AI extracts: "What happened next" story
  - Blotato template: Long-form storytelling
  - Output: 2-3 min email nurture video
↓
Distribution Node:
  - YouTube API: Upload with SEO-optimized titles
  - Blotato Post API: Cross-post to Instagram/TikTok
  - Meta Ads API: Create retargeting campaigns
  - MailerLite: Embed in email sequences
```


***

## Part 3: Technical Implementation (n8n + Blotato)

### n8n Setup (Self-Hosted Recommended)

From the Sabrina video and n8n 2026 best practices:[^1][^2]

```javascript
// n8n Configuration for ChiefOS Moltworker
{
  "hosting": "self-hosted (Hostinger/VPS)",
  "version": "1.113.3+ (AI agent nodes)",
  "features": {
    "ai_agent_node": true,        // For autonomous decision-making
    "verified_community_nodes": true,  // For Blotato integration
    "memory_buffer": true,        // For context retention
    "tool_calling": true          // For multi-agent delegation
  },
  "cost": "$10-25/month (Hostinger) vs $50-200/month (cloud)"
}
```


### Blotato API Integration

From Sabrina's tutorial and Blotato API docs:[^3]

```yaml
Blotato API Endpoints Used:
├── POST /v2/videos/from-templates
│   ├── Templates: carousel, slideshow, AI video, quote card
│   ├── Inputs: prompt, style, author_name, CTA
│   └── Render: true (immediate) or false (draft)
│
├── GET /v2/videos/{id}
│   └── Retrieve generated visual after processing
│
├── POST /v2/posts
│   ├── Platforms: Instagram, YouTube, TikTok, LinkedIn, X
│   ├── Media: video_url or image_urls (array)
│   └── Caption: auto-generated or custom
│
└── GET /v2/sources
    └── Extract content from YouTube/TikTok for remixing
```


### API Key Setup (From Video)

Sabrina's exact process for Blotato integration:

1. **Sign up at blotato.com**
2. **Navigate**: Settings → API → Generate API Key
3. **In n8n**: Create credential → Paste API key → Test connection
4. **Enable**: Verified community nodes in n8n settings (required for Blotato node)

***

## Part 4: The Moltworker "Employees"

### 1. Research Agent (Niche Hunter)

**Role**: Finds profitable, low-competition book topics weekly

```python
# Research Agent Logic (n8n AI Agent Node)
Tools:
- Amazon Product API: Search + BSR extraction
- Google Trends API: Demand validation
- Perplexity API: Trending topics + citations
- Reddit API: Pain points from r/ExCons, r/Prison, r/Philosophy

Prompt:
"You are a market research analyst. Find 3 book topics in [niche] that:
1. Have Amazon BSR between 100K-500K (proving demand)
2. Are trending up on Google Trends (growing market)
3. Have <50 competing titles (low competition)
4. Solve an emotionally painful problem (high conversion)

Return JSON: {topic, pain_point, bsr_data, trend_score, competition_analysis}"
```

**Output**: Validated book topics with data-driven "Go" decision

**Time Saved**: 4 hours/week → 0 hours (fully automated)

***

### 2. Writing Agent (Content Creator)

**Role**: Produces publication-ready manuscripts

```python
# Writing Agent Workflow
Step 1: Outline Generation
- LLM: Claude 3.5 Sonnet (200K context)
- Input: Validated topic from Research Agent
- Output: 8-10 chapter outline with headers

Step 2: Draft Creation
- LLM: Claude (1K words per chapter)
- Parallel: 3 chapters at once (async)
- Output: 10K word first draft

Step 3: Editor Sub-Agent
- Task: Voice consistency check
- Tool: Custom prompt comparing to previous books
- Output: Refined manuscript matching your tone

Step 4: Source Agent
- Tool: Perplexity API (20+ citations)
- Output: Fact-checked, sourced manuscript

Step 5: Formatter
- Tool: Pandoc/Reedsy API
- Output: KDP-ready PDF + EPUB
```

**Output**: Complete book ready for upload

**Time Saved**: 40 hours/book → 2 hours review/book

***

### 3. Visual Agent (Asset Designer)

**Role**: Creates all visual assets simultaneously

```yaml
Parallel Asset Generation:
├── Book Cover (Canva API)
│   ├── 5 variants per book
│   ├── A/B test designs
│   └── Formats: KDP cover, social square, banner
│
├── Carousel Content (Blotato API)
│   ├── Template: Tutorial carousel (flat style)
│   ├── Template: Twitter quote card
│   ├── Template: Minimalist monocolor
│   └── Output: 3 carousels per book
│
├── Social Mockups (Canva)
│   ├── Instagram post templates
│   ├── YouTube thumbnail (3 variants)
│   └── LinkedIn article header
│
└── Hero Images (Ideogram)
    ├── Book-specific imagery
    └── Ad creative assets
```

**Output**: Complete asset package in <10 minutes

**Time Saved**: 6 hours/book → 0.5 hours review

***

### 4. Video Agent (Faceless Factory)

**Role**: Produces 8-video marketing series per book (Sabrina's method)

```yaml
# Video Factory Configuration (Blotato + n8n)
Templates Available:
├── Carousel (instant render) - For quick testing
├── AI Image Slideshow (30-60 sec) - For storytelling
├── AI Video with Voiceover (11 Labs) - For premium content
└── POV Video (trending format) - For viral potential

Workflow Per Video:
1. AI extracts script from book chapter (Claude)
2. Blotato generates visual from template
3. 11 Labs applies AI voiceover (if video template)
4. n8n waits for render completion
5. Retrieved video auto-posted to platforms
6. Meta Ads API creates retargeting campaign

Quality Control:
- Sabrina's approach: Start with carousel (instant render)
- Test hook effectiveness
- Scale winners to full video production
```

**Output**: 8 videos per book (96 videos/year for 12 books)

**Time Saved**: 16 hours/book (2 hours/video manual) → 0.5 hours review

***

### 5. Marketing Agent (Distribution)

**Role**: Publishes content across all channels

```yaml
Distribution Workflow:
├── Book Launch
│   ├── KDP API: Upload + price setting ($4.99)
│   ├── Stripe: Create product page
│   ├── MailerLite: Trigger welcome sequence
│   └── Firebase: Update book database
│
├── Social Media (Blotato Post API)
│   ├── Instagram: Carousel + video series
│   ├── YouTube: 8-video playlist
│   ├── TikTok: Short-form versions
│   ├── LinkedIn: Article excerpts
│   └── X/Twitter: Quote cards + threads
│
├── Email Marketing (MailerLite)
│   ├── Launch announcement
│   ├── 5-email nurture sequence
│   ├── Weekly newsletter integration
│   └── Retargeting non-openers
│
└── Paid Ads (Meta API)
    ├── Lookalike audiences (email list)
    ├── Retargeting (website visitors)
    ├── Interest targeting (niche-specific)
    └── Budget: $5-10/day per book (auto-optimized)
```

**Output**: Multi-channel presence activated simultaneously

**Time Saved**: 8 hours/launch → 0.5 hours monitoring

***

### 6. Analytics Agent (Optimizer)

**Role**: Tracks performance and optimizes automatically

```python
# Analytics Dashboard (ChiefOS Integration)
Metrics Tracked:
├── Amazon KDP
│   ├── Daily sales by book
│   ├── BSR ranking trends
│   ├── Review velocity
│   └── Royalty earnings
│
├── Direct Sales (Stripe)
│   ├── Conversion rate by page
│   ├── AOV (average order value)
│   ├── Refund rate
│   └── Customer LTV
│
├── Email (MailerLite)
│   ├── Open rates by sequence
│   ├── Click rates by CTA
│   ├── List growth velocity
│   └── Unsubscribe rates
│
├── Social (Blotato + Native APIs)
│   ├── Views per video
│   ├── Engagement rate
│   ├── Follower growth
│   └── Click-through to book
│
└── Ads (Meta)
    ├── CAC (customer acquisition cost)
    ├── ROAS (return on ad spend)
    ├── CTR by creative
    └── Audience performance

Automated Actions:
- If BSR drops below 100K → Scale ads
- If email open rate <20% → Rewrite subject lines
- If video CTR <3% → Generate new variations
- Weekly: Email report to ChiefOS dashboard
```

**Output**: Data-driven optimization without manual analysis

**Time Saved**: 5 hours/week → 0.5 hours review

***

## Part 5: ChiefOS Integration Architecture

### System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    CHIEFOS DASHBOARD                        │
│                     (Your Command Center)                   │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  n8n Workflow │    │  n8n Workflow │    │  n8n Workflow │
│   Engine #1   │    │   Engine #2   │    │   Engine #3   │
│  (Research)   │    │  (Production) │    │ (Distribution)│
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^4][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: https://blog.n8n.io/best-ai-workflow-automation-tools/
[^2]: https://hatchworks.com/blog/ai-agents/n8n-guide/
[^3]: https://help.blotato.com/api/api-reference/create-video
[^4]: https://www.youtube.com/watch?v=6bBWmnv8Q8o
[^5]: https://n8n.io
[^6]: https://www.reddit.com/r/n8n_ai_agents/comments/1pzk594/automate_your_ai_workflows_with_n8n_in_2026/
[^7]: https://www.youtube.com/watch?v=Fqeo8q8-nJg
[^8]: https://skywork.ai/blog/ai-agent/n8n-2025-update-new-ai-nodes-and-self-hosting-improvements/
[^9]: https://www.youtube.com/watch?v=eQNkwr82KVo
[^10]: https://www.youtube.com/watch?v=A_SGH7EMxcE&vl=en
[^11]: https://chronexa.io/blog/n8n-ai-agent-node-build-multi-agent-systems-in-2026
[^12]: https://www.youtube.com/watch?v=4cQWJViybAQ
[^13]: https://www.reddit.com/r/nocode/comments/1p5oint/i_built_a_workflow_that_autogenerates_short_ai/
[^14]: https://strapi.io/blog/build-ai-agents-n8n
[^15]: https://github.com/n8n-io/n8n
[^16]: https://www.reddit.com/r/n8n/comments/1p5nsr5/i_built_a_workflow_that_autogenerates_short_ai/```

