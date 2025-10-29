"use strict";

(function initReviewsMasonry() {
    const gridEl = document.getElementById("reviewsMasonry");
    const loadMoreButton = document.getElementById("reviewsLoadMore");

    if (!gridEl) {
        return;
    }

    const imageSources = [
        "property_reviews/brimhall_desert_color/PNG image 10.png",
        "property_reviews/brimhall_desert_color/PNG image 11.png",
        "property_reviews/brimhall_desert_color/PNG image 2.png",
        "property_reviews/brimhall_desert_color/PNG image 3.png",
        "property_reviews/brimhall_desert_color/PNG image 4.png",
        "property_reviews/brimhall_desert_color/PNG image 5.png",
        "property_reviews/brimhall_desert_color/PNG image 6.png",
        "property_reviews/brimhall_desert_color/PNG image 7.png",
        "property_reviews/brimhall_desert_color/PNG image 8.png",
        "property_reviews/brimhall_desert_color/PNG image 9.png",
        "property_reviews/brimhall_desert_color/PNG image.png",
        "property_reviews/brimhall_desert_color/Screenshot 2025-10-28 at 3.16.33 PM.png",
        "property_reviews/carolina_desert_color/PNG image 2.png",
        "property_reviews/carolina_desert_color/PNG image.png",
        "property_reviews/gavin_long_valley/PNG image.png",
        "property_reviews/greg_and_leigh/PNG image 10.png",
        "property_reviews/greg_and_leigh/PNG image 11.png",
        "property_reviews/greg_and_leigh/PNG image 2.png",
        "property_reviews/greg_and_leigh/PNG image 3.png",
        "property_reviews/greg_and_leigh/PNG image 4.png",
        "property_reviews/greg_and_leigh/PNG image 5.png",
        "property_reviews/greg_and_leigh/PNG image 6.png",
        "property_reviews/greg_and_leigh/PNG image 7.png",
        "property_reviews/greg_and_leigh/PNG image 8.png",
        "property_reviews/greg_and_leigh/PNG image 9.png",
        "property_reviews/greg_and_leigh/PNG image.png",
        "property_reviews/greg_and_leigh/Screenshot 2025-10-28 at 1.34.54 PM.png",
        "property_reviews/jace_fish_lake/PNG image 10.png",
        "property_reviews/jace_fish_lake/PNG image 11.png",
        "property_reviews/jace_fish_lake/PNG image 12.png",
        "property_reviews/jace_fish_lake/PNG image 13.png",
        "property_reviews/jace_fish_lake/PNG image 14.png",
        "property_reviews/jace_fish_lake/PNG image 2.png",
        "property_reviews/jace_fish_lake/PNG image 3.png",
        "property_reviews/jace_fish_lake/PNG image 4.png",
        "property_reviews/jace_fish_lake/PNG image 5.png",
        "property_reviews/jace_fish_lake/PNG image 6.png",
        "property_reviews/jace_fish_lake/PNG image 7.png",
        "property_reviews/jace_fish_lake/PNG image 8.png",
        "property_reviews/jace_fish_lake/PNG image 9.png",
        "property_reviews/jace_fish_lake/PNG image.png",
        "property_reviews/jace_hawaii_casita/PNG image 10.png",
        "property_reviews/jace_hawaii_casita/PNG image 11.png",
        "property_reviews/jace_hawaii_casita/PNG image 12.png",
        "property_reviews/jace_hawaii_casita/PNG image 13.png",
        "property_reviews/jace_hawaii_casita/PNG image 2.png",
        "property_reviews/jace_hawaii_casita/PNG image 3.png",
        "property_reviews/jace_hawaii_casita/PNG image 4.png",
        "property_reviews/jace_hawaii_casita/PNG image 5.png",
        "property_reviews/jace_hawaii_casita/PNG image 6.png",
        "property_reviews/jace_hawaii_casita/PNG image 7.png",
        "property_reviews/jace_hawaii_casita/PNG image 8.png",
        "property_reviews/jace_hawaii_casita/PNG image 9.png",
        "property_reviews/jace_hawaii_casita/PNG image.png",
        "property_reviews/jace_hawaii_main/PNG image 10.png",
        "property_reviews/jace_hawaii_main/PNG image 11.png",
        "property_reviews/jace_hawaii_main/PNG image 12.png",
        "property_reviews/jace_hawaii_main/PNG image 13.png",
        "property_reviews/jace_hawaii_main/PNG image 14.png",
        "property_reviews/jace_hawaii_main/PNG image 15.png",
        "property_reviews/jace_hawaii_main/PNG image 16.png",
        "property_reviews/jace_hawaii_main/PNG image 17.png",
        "property_reviews/jace_hawaii_main/PNG image 18.png",
        "property_reviews/jace_hawaii_main/PNG image 19.png",
        "property_reviews/jace_hawaii_main/PNG image 2.png",
        "property_reviews/jace_hawaii_main/PNG image 20.png",
        "property_reviews/jace_hawaii_main/PNG image 21.png",
        "property_reviews/jace_hawaii_main/PNG image 22.png",
        "property_reviews/jace_hawaii_main/PNG image 23.png",
        "property_reviews/jace_hawaii_main/PNG image 24.png",
        "property_reviews/jace_hawaii_main/PNG image 25.png",
        "property_reviews/jace_hawaii_main/PNG image 26.png",
        "property_reviews/jace_hawaii_main/PNG image 27.png",
        "property_reviews/jace_hawaii_main/PNG image 28.png",
        "property_reviews/jace_hawaii_main/PNG image 29.png",
        "property_reviews/jace_hawaii_main/PNG image 3.png",
        "property_reviews/jace_hawaii_main/PNG image 30.png",
        "property_reviews/jace_hawaii_main/PNG image 31.png",
        "property_reviews/jace_hawaii_main/PNG image 32.png",
        "property_reviews/jace_hawaii_main/PNG image 33.png",
        "property_reviews/jace_hawaii_main/PNG image 34.png",
        "property_reviews/jace_hawaii_main/PNG image 35.png",
        "property_reviews/jace_hawaii_main/PNG image 4.png",
        "property_reviews/jace_hawaii_main/PNG image 5.png",
        "property_reviews/jace_hawaii_main/PNG image 6.png",
        "property_reviews/jace_hawaii_main/PNG image 7.png",
        "property_reviews/jace_hawaii_main/PNG image 8.png",
        "property_reviews/jace_hawaii_main/PNG image 9.png",
        "property_reviews/jace_hawaii_main/PNG image.png",
        "property_reviews/jace_hawaii_main/Screenshot 2025-10-28 at 3.49.58 PM.png",
        "property_reviews/jace_hawaii_main/Screenshot 2025-10-28 at 3.52.48 PM.png",
        "property_reviews/jace_hawaii_main/Screenshot 2025-10-28 at 4.03.31 PM.png",
        "property_reviews/jace_she_shed/PNG image 2.png",
        "property_reviews/jace_she_shed/PNG image 3.png",
        "property_reviews/jace_she_shed/PNG image 4.png",
        "property_reviews/jace_she_shed/PNG image 5.png",
        "property_reviews/jace_she_shed/PNG image 6.png",
        "property_reviews/jace_she_shed/PNG image 7.png",
        "property_reviews/jace_she_shed/PNG image 8.png",
        "property_reviews/jace_she_shed/PNG image 9.png",
        "property_reviews/jace_she_shed/PNG image.png",
        "property_reviews/jace_virgin/PNG image 10.png",
        "property_reviews/jace_virgin/PNG image 11.png",
        "property_reviews/jace_virgin/PNG image 12.png",
        "property_reviews/jace_virgin/PNG image 13.png",
        "property_reviews/jace_virgin/PNG image 14.png",
        "property_reviews/jace_virgin/PNG image 15.png",
        "property_reviews/jace_virgin/PNG image 16.png",
        "property_reviews/jace_virgin/PNG image 17.png",
        "property_reviews/jace_virgin/PNG image 18.png",
        "property_reviews/jace_virgin/PNG image 19.png",
        "property_reviews/jace_virgin/PNG image 2.png",
        "property_reviews/jace_virgin/PNG image 20.png",
        "property_reviews/jace_virgin/PNG image 21.png",
        "property_reviews/jace_virgin/PNG image 22.png",
        "property_reviews/jace_virgin/PNG image 23.png",
        "property_reviews/jace_virgin/PNG image 24.png",
        "property_reviews/jace_virgin/PNG image 25.png",
        "property_reviews/jace_virgin/PNG image 26.png",
        "property_reviews/jace_virgin/PNG image 27.png",
        "property_reviews/jace_virgin/PNG image 28.png",
        "property_reviews/jace_virgin/PNG image 29.png",
        "property_reviews/jace_virgin/PNG image 3.png",
        "property_reviews/jace_virgin/PNG image 30.png",
        "property_reviews/jace_virgin/PNG image 31.png",
        "property_reviews/jace_virgin/PNG image 32.png",
        "property_reviews/jace_virgin/PNG image 33.png",
        "property_reviews/jace_virgin/PNG image 34.png",
        "property_reviews/jace_virgin/PNG image 35.png",
        "property_reviews/jace_virgin/PNG image 36.png",
        "property_reviews/jace_virgin/PNG image 4.png",
        "property_reviews/jace_virgin/PNG image 5.png",
        "property_reviews/jace_virgin/PNG image 6.png",
        "property_reviews/jace_virgin/PNG image 7.png",
        "property_reviews/jace_virgin/PNG image 8.png",
        "property_reviews/jace_virgin/PNG image 9.png",
        "property_reviews/jace_virgin/PNG image.png",
        "property_reviews/jace_virgin/Screenshot 2025-10-28 at 2.24.24 PM.png",
        "property_reviews/jace_virgin/Screenshot 2025-10-28 at 2.37.27 PM.png",
        "property_reviews/jace_virgin/Screenshot 2025-10-28 at 2.43.40 PM.png",
        "property_reviews/mary_toquerville/PNG image 2.png",
        "property_reviews/mary_toquerville/PNG image 3.png",
        "property_reviews/mary_toquerville/PNG image 4.png",
        "property_reviews/mary_toquerville/PNG image 5.png",
        "property_reviews/mary_toquerville/PNG image 6.png",
        "property_reviews/mary_toquerville/PNG image 7.png",
        "property_reviews/mary_toquerville/PNG image 8.png",
        "property_reviews/mary_toquerville/PNG image 9.png",
        "property_reviews/mary_toquerville/PNG image.png",
        "property_reviews/spears_arcadia/PNG image 2.png",
        "property_reviews/spears_arcadia/PNG image 3.png",
        "property_reviews/spears_arcadia/PNG image 4.png",
        "property_reviews/spears_arcadia/PNG image 5.png",
        "property_reviews/spears_arcadia/PNG image 6.png",
        "property_reviews/spears_arcadia/PNG image 7.png",
        "property_reviews/spears_arcadia/PNG image 8.png",
        "property_reviews/spears_arcadia/PNG image 9.png",
        "property_reviews/spears_arcadia/PNG image.png"
    ];

    if (!imageSources.length) {
        gridEl.classList.remove("is-initializing");
        gridEl.setAttribute("aria-busy", "false");
        if (loadMoreButton) {
            loadMoreButton.hidden = true;
        }
        return;
    }

    const shuffledSources = imageSources.slice();

    for (let i = shuffledSources.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffledSources[i];
        shuffledSources[i] = shuffledSources[j];
        shuffledSources[j] = temp;
    }

    const INITIAL_BATCH_SIZE = 24;
    const SUBSEQUENT_BATCH_SIZE = 12;

    let nextIndex = 0;
    let queuedMeasurementFrame = null;
    let pendingImageCount = 0;
    const measurementQueue = new Set();

    const prefersReducedMotionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    let shouldReduceMotion = !!(prefersReducedMotionQuery && prefersReducedMotionQuery.matches);

    if (prefersReducedMotionQuery && "addEventListener" in prefersReducedMotionQuery) {
        prefersReducedMotionQuery.addEventListener("change", function onMotionPreferenceChange(event) {
            shouldReduceMotion = event.matches;
        });
    }

    const intersectionObserver = !shouldReduceMotion && "IntersectionObserver" in window
        ? new IntersectionObserver(function handleIntersections(entries, observer) {
            entries.forEach(function handleEntry(entry) {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    item.classList.add("is-visible");
                    observer.unobserve(item);
                }
            });
        }, { threshold: 0.15 })
        : null;

    const resizeObserver = "ResizeObserver" in window
        ? new ResizeObserver(function handleResize(entries) {
            entries.forEach(function handleEntry(entry) {
                const item = entry.target.closest(".masonry-item");
                if (item) {
                    queueMeasurement(item);
                }
            });
        })
        : null;

    function getGridMetrics() {
        const styles = window.getComputedStyle(gridEl);
        const rowHeight = Number.parseFloat(styles.getPropertyValue("grid-auto-rows")) || 16;
        const rowGap = Number.parseFloat(styles.getPropertyValue("row-gap")) || 16;
        return { rowHeight, rowGap };
    }

    function flushMeasurements() {
        if (!measurementQueue.size) {
            queuedMeasurementFrame = null;
            return;
        }

        const metrics = getGridMetrics();
        measurementQueue.forEach(function adjustItem(item) {
            const image = item.querySelector("img");
            if (!image) {
                return;
            }

            const contentHeight = image.getBoundingClientRect().height;
            if (!contentHeight) {
                return;
            }

            const denominator = metrics.rowHeight + metrics.rowGap;
            const span = Math.max(1, Math.ceil((contentHeight + metrics.rowGap) / (denominator || metrics.rowHeight || 1)));
            item.style.gridRowEnd = "span " + span;
        });

        measurementQueue.clear();
        queuedMeasurementFrame = null;
    }

    function queueMeasurement(item) {
        if (!item) {
            return;
        }
        measurementQueue.add(item);
        if (!queuedMeasurementFrame) {
            queuedMeasurementFrame = window.requestAnimationFrame(flushMeasurements);
        }
    }

    function settlePending() {
        if (pendingImageCount > 0) {
            pendingImageCount -= 1;
        }
        if (pendingImageCount === 0) {
            gridEl.setAttribute("aria-busy", "false");
        }
    }

    function registerPendingImage() {
        pendingImageCount += 1;
        gridEl.setAttribute("aria-busy", "true");
    }

    function createMasonryItem(src, position) {
        const item = document.createElement("div");
        item.className = "masonry-item";
        item.setAttribute("role", "listitem");
        item.style.gridRowEnd = "span 1";

        if (!shouldReduceMotion) {
            const delayInMs = Math.min((position % 12) * 45, 320);
            item.style.transitionDelay = delayInMs + "ms";
        }

        const image = document.createElement("img");
        image.src = src;
        image.alt = "";
        image.loading = "lazy";
        image.decoding = "async";

        image.addEventListener("load", function onImageLoad() {
            queueMeasurement(item);
            settlePending();
        });

        image.addEventListener("error", function onImageError() {
            item.classList.add("is-visible");
            if (resizeObserver) {
                resizeObserver.unobserve(image);
            }
            settlePending();
        });

        if (resizeObserver) {
            resizeObserver.observe(image);
        }

        item.appendChild(image);

        if (image.complete && image.naturalWidth > 0) {
            queueMeasurement(item);
        } else if (!image.complete) {
            registerPendingImage();
        } else {
            item.classList.add("is-visible");
        }

        if (intersectionObserver) {
            intersectionObserver.observe(item);
        } else {
            item.classList.add("is-visible");
        }

        return item;
    }

    function appendBatch(batchSize) {
        const slice = shuffledSources.slice(nextIndex, nextIndex + batchSize);

        if (!slice.length) {
            gridEl.classList.remove("is-initializing");
            updateLoadMoreState();
            if (pendingImageCount === 0) {
                gridEl.setAttribute("aria-busy", "false");
            }
            return;
        }

        slice.forEach(function appendItem(src, sliceIndex) {
            const item = createMasonryItem(src, nextIndex + sliceIndex);
            gridEl.appendChild(item);
        });

        nextIndex += slice.length;
        gridEl.classList.remove("is-initializing");
        if (pendingImageCount === 0) {
            gridEl.setAttribute("aria-busy", "false");
        }
        updateLoadMoreState();
    }

    function updateLoadMoreState() {
        if (!loadMoreButton) {
            return;
        }

        const hasMore = nextIndex < shuffledSources.length;
        loadMoreButton.disabled = !hasMore;
        loadMoreButton.hidden = !hasMore;
        loadMoreButton.setAttribute("aria-hidden", String(!hasMore));
    }

    function handleLoadMoreClick(event) {
        event.preventDefault();
        appendBatch(SUBSEQUENT_BATCH_SIZE);
    }

    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", handleLoadMoreClick);
    }

    appendBatch(INITIAL_BATCH_SIZE);

    window.addEventListener("resize", debounce(function onResize() {
        const items = gridEl.querySelectorAll(".masonry-item");
        items.forEach(queueMeasurement);
    }, 180));

    function debounce(fn, wait) {
        let timeoutId = null;
        return function debounced() {
            const context = this;
            const args = arguments;
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(function trigger() {
                fn.apply(context, args);
            }, wait);
        };
    }
})();

