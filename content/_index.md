+++
title = "Home"
template = "index.html"
description = "I create beautiful, delightful solutions that contribute back to the human experience."

+++

{{ home_h1() }}

{{ newsletter_sign_up(title="Subscribe to my newsletter to <em>be the first</em> to know about upcoming projects")}}


---

## Featured Projects {.featured-projects}

- [Last One Flying (Retro Arcade Space Shooter Game)](@/portfolio/last-one-flying.md)
- [Vala Programming Language Website](@/portfolio/vala-website-2022.md)
- [Four-In-A-Row HTML5 Canvas Game Tutorial](@/blog/making-four-in-a-row-part-1.md)


{% cta() %}
[See what else I've made](@/portfolio/_index.md)
{% end %}

---

{{ contact_me() }}