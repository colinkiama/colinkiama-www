var links = document.body.querySelectorAll("nav a, .blog-item a, .prefetch");
[].forEach.call(links, function(link) {
    link.addEventListener("mouseenter", function() {
        // Check if prefetch link already exists before adding one
        let doesPrefetchLinkExist = false;
        let prefetchLinks = document.head.querySelectorAll('link');
        for (let i = 0; i < prefetchLinks.length; i++) {
            const prefetchLink = prefetchLinks[i];
            const prefetchHref = prefetchLink.href;
            if (prefetchHref) {
                if (prefetchHref === link.href) {
                    doesPrefetchLinkExist = true;
                    break;
                }
            }
        }
        if (!doesPrefetchLinkExist) {
            var newPrefetchLink = document.createElement("link");
            newPrefetchLink.rel = "prefetch";
            newPrefetchLink.href = link.href;
            document.head.appendChild(newPrefetchLink);
        }
    });
});