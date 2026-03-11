import { flushSync } from "./scheduler.js";
import { isBrowser } from "./env.js";
export var ViewTransitions;
(function (ViewTransitions) {
    const jobs = [];
    let running = false;
    let scheduled = false;
    let transition = null;
    const supported = isBrowser && typeof document.startViewTransition === "function";
    function run(callback, options) {
        const signal = options?.signal;
        return new Promise((resolve) => {
            const job = async () => {
                const result = await callback();
                resolve(result);
            };
            jobs.push(job);
            signal?.addEventListener("abort", () => {
                const i = jobs.indexOf(job);
                if (i !== -1) {
                    jobs.splice(i, 1);
                }
                else {
                    transition?.skipTransition();
                }
            }, { once: true });
            schedule();
        });
    }
    ViewTransitions.run = run;
    function stop() {
        transition?.skipTransition();
        transition = null;
        jobs.length = 0;
        running = false;
        scheduled = false;
    }
    ViewTransitions.stop = stop;
    function schedule() {
        if (scheduled)
            return;
        scheduled = true;
        queueMicrotask(() => {
            scheduled = false;
            runJobs();
        });
    }
    async function runJobs() {
        if (running || jobs.length === 0)
            return;
        running = true;
        const __jobs = [...jobs];
        jobs.length = 0;
        const runJobs = async () => {
            await Promise.all(__jobs.map((j) => j()));
            flushSync();
        };
        if (!supported) {
            await runJobs();
        }
        else {
            transition = document.startViewTransition(runJobs);
            await transition.finished;
        }
        transition = null;
        running = false;
        if (jobs.length > 0) {
            schedule();
        }
    }
})(ViewTransitions || (ViewTransitions = {}));
//# sourceMappingURL=viewTransitions.js.map