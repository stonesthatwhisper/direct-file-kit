import * as sfg from '@irs/js-factgraph-scala';
import { wrappedFacts } from '../fact-dictionary/generated/wrappedFacts.js';
import flowConfig, { createFlowConfig } from '../flow/flowConfig.tsx';
import locales from '../locales/index.ts'; // adjust to the file you need
import flowNodes from '../flow/flow.js';

const flowConfig = createFlowConfig(flowNodes);
/*  {
    categories,
    subcategoriesByRoute,
    screens,
    screensByRoute,
    collectionLoopsByName,
    subsubcategoriesByRoute
  }
 */



// now you can use flowConfig.screens, flowConfig.categories, etc.
for (const screen of flowConfig.screens) {
  console.log(screen.screenRoute);
}


const CURRENT_TAX_YEAR = '2024';

const meta = new sfg.DigestMetaWrapper(CURRENT_TAX_YEAR).toNative();

const facts = wrappedFacts.map((fact) =>
  sfg.DigestNodeWrapperFactory.toNative(
    new sfg.DigestNodeWrapper(fact.path, fact.writable ?? null, fact.derived ?? null, fact.placeholder ?? null),
  ),
);

const config = sfg.FactDictionaryConfig.create(meta, facts);
const dictionary = sfg.FactDictionaryFactory.fromConfig(config);

// Seed the graph with whatever persisted answers you want to analyze
const persister = sfg.JSPersister.create(JSON.stringify({}));
const graph = sfg.GraphFactory.apply(dictionary, persister);


for (const category of flowConfig.categories) {
  console.log(category);
}

// Example: walk a flow route and read the facts it references
for (const route of flowConfig.subcategoriesByRoute) {
  const result = graph.get(route.factPath); // replace with the actual field on your flow object
  console.log(route.routeId, result?.toString());
}

// Example: inspect locale strings for each fact
for (const [factPath, translations] of Object.entries(locales.factQuestions)) {
  const explanation = graph.explain(factPath);
  console.log(factPath, explanation.solves);
}

