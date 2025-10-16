## Run a script using sfg

### prepare

  - Start by updating the compiled bundle. From `direct-file/fact-graph-scala` run

        sbt fastOptJS  # (or fullOptJS when you need the optimized build)

  - then from `direct-file/df-client/df-client-app` run

        npm run copy-transpiled-js   # copies js/target/.../main.js into df-client/js-factgraph-scala/src/main.js, which is the CommonJS module you’ll load from TypeScript.

  - Make sure the fact metadata you want to process is current. In `df-client/df-client-app` run

        npm run generate-fact-dictionary   # it re-parses the XML fragments under backend/src/main/resources/tax (mirrored in src/fact-dictionary/generate-src/xml-src) and regenerates src/fact-dictionary/generated/wrappedFacts.ts, paths.ts, etc. All of the TS helpers in flow and locales already import those generated artifacts, so keeping them fresh keeps everything aligned.

  - You can then run a TypeScript script that consumes the Scala.js bundle and the generated facts. Because `@irs/js-factgraph-scala` is published in-place
    (the package lives at `df-client/js-factgraph-scala`), you can import it directly. See example skeleton `src/scripts/runFactGraph.ts`


### How to run a script

    npx vite-node --config vite.config.ts src/scripts/runFactGraph.ts
