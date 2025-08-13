+++
title = "Home"
template = "index.html"
description = "I create beautiful, delightful solutions that contribute back to the human experience."
insert_anchor_links= "right"
+++

{% header() %}
{{ home_h1() }}

{{ newsletter_sign_up(title="Subscribe to my newsletter to <em>be the first</em> to know about upcoming projects")}}
{% end %}

{% section(class="separate") %}

{% header() %}
## Featured Projects    
{% end %}

- [Last One Flying (Retro Arcade Space Shooter Game)](https://colinkiama.itch.io/last-one-flying)
- [Vala Programming Language Website](https://vala.dev)
- [Four-In-A-Row HTML5 Canvas Game Tutorial](https://www.colinkiama.com/blog/making-four-in-a-row-part-1/)


{% cta() %}
[See what else I've made](@/portfolio/index.md)
{% end %}

{% end %}