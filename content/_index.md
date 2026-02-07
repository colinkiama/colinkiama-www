+++
title = "Home"
template = "index.html"
description = "I create beautiful, delightful solutions that contribute back to the human experience."
[extra]

[[extra.portfolio_items]]
title = "Last One Flying"
description = "I created a retro-inspired arcade space shooter game. Made with the Phaser Game Framework."
thumbnail = "https://ik.imagekit.io/mune/last-one-flying-gameplay_x9m2-BeKo.gif?updatedAt=1758306529668"
thumbnail_alt_text = "Last One Flying"
path = "/portfolio/last-one-flying"

[[extra.portfolio_items]]
title = "Pomodoro Timer UWP"
description = "A pomodoro timer app with features like \"always-on-top\" mode, background support and the ability to customise your each interval and how many sessions you'll have."
thumbnail = "https://ik.imagekit.io/mune/pomodoro-timer_GDR4r4_faNPO.png"
thumbnail_alt_text = "A program with a timer showing the current time left in minutes and seconds."
path = "/portfolio/pomodoro-timer-uwp"
badges=["<a href=\"https://www.producthunt.com/posts/pomodoro-timer-uwp?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-pomodoro-timer-uwp\" target=\"_blank\"><img src=\"https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=136007&theme=light\" alt=\"Pomodoro Timer UWP - Be more productive with your time | Product Hunt\" style=\"width: 250px; height: 54px;\" width=\"250\" height=\"54\"></a>"]


[[extra.portfolio_items]]
title = "Vala Website (2022)"
description = "I created a website for a programming language called Vala. It replaces an old set of wiki pages with a fully branded original website"
thumbnail = "https://ik.imagekit.io/mune/vala-www-capture_ahfD-0S9X.png"
thumbnail_alt_text = "Vala Hero Image"
path = "/portfolio/vala-website-2022"


+++

{{ home_h1() }}

## Portfolio - Featured Projects

{{ featured_portfolio_items() }}

{% cta() %}
[See what else I've made](@/portfolio/_index.md)
{% end %}

---

{{ contact_me() }}