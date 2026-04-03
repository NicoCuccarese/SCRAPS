// ─────────────────────────────────────────────
//  CORPUS — Environmental & Ecology articles
// ─────────────────────────────────────────────

const CORPUS = [
  {
    id: 0,
    category: "Climate Systems",
    title: "Ocean Acidification and Coral Reef Collapse",
    text: "Rising atmospheric carbon dioxide is dissolving into oceans, decreasing pH and threatening coral reef ecosystems worldwide. Calcium carbonate structures that reefs depend on become unstable under acidic conditions. Marine biodiversity hotspots face irreversible damage as temperature and acidity increase together. Scientists have documented coral bleaching events across the Great Barrier Reef correlated with ocean warming. Mitigation requires rapid reduction in greenhouse gas emissions globally."
  },
  {
    id: 1,
    category: "Machine Learning",
    title: "Deep Learning for Species Classification",
    text: "Convolutional neural networks trained on image datasets have achieved expert-level accuracy in classifying species from photographs. Transfer learning from ImageNet models accelerates training on ecological datasets with limited labeled examples. Citizen science platforms generate millions of wildlife observations that can feed automated classification pipelines. Model interpretability techniques reveal which image features drive species identification decisions."
  },
  {
    id: 2,
    category: "Ecology",
    title: "Deforestation and Carbon Stock Loss in the Amazon",
    text: "The Amazon rainforest stores vast quantities of carbon in biomass and soil. Deforestation driven by agricultural expansion releases stored carbon into the atmosphere, accelerating climate change. Remote sensing data from satellites tracks forest cover loss in near real-time. Tipping points in Amazon dieback could trigger irreversible savannification across large regions. Indigenous land rights correlate with reduced deforestation rates in protected territories."
  },
  {
    id: 3,
    category: "Data Science",
    title: "Time Series Forecasting for Wildlife Population Dynamics",
    text: "Statistical models and recurrent neural networks are applied to longitudinal ecological monitoring datasets. Population dynamics exhibit cyclical patterns driven by predator-prey relationships and seasonal resource availability. Missing data imputation techniques are essential when sensor failures or survey gaps occur. Uncertainty quantification in population forecasts informs conservation decision-making under ecological uncertainty."
  },
  {
    id: 4,
    category: "Remote Sensing",
    title: "Satellite Imagery Analysis for Land Cover Change Detection",
    text: "Multispectral and hyperspectral satellite sensors capture surface reflectance across wavelengths invisible to human eyes. Normalized difference vegetation index derived from red and near-infrared bands quantifies plant health and density. Change detection algorithms compare temporal image stacks to identify deforestation, urbanization, and habitat degradation. Google Earth Engine enables cloud-scale geospatial processing without local compute infrastructure."
  },
  {
    id: 5,
    category: "Climate Systems",
    title: "Arctic Sea Ice Decline and Albedo Feedback Loops",
    text: "Arctic sea ice extent has declined dramatically over recent decades due to atmospheric warming. Ice reflects solar radiation back into space, so ice loss exposes darker ocean water that absorbs more heat. This albedo feedback amplifies warming disproportionately at high latitudes. Permafrost thaw releases methane, a potent greenhouse gas that further accelerates climate forcing. Model projections suggest ice-free Arctic summers within decades."
  },
  {
    id: 6,
    category: "Biodiversity",
    title: "Pollinator Decline and Agricultural Yield Consequences",
    text: "Wild bee populations have declined significantly due to pesticide exposure, habitat loss, and pathogen pressure. Pollination services provided by bees and other insects support one-third of global crop production. Monoculture agriculture reduces floral diversity available to pollinators throughout the growing season. Rewilding field margins with native flowering plants improves pollinator abundance and crop yields simultaneously."
  },
  {
    id: 7,
    category: "NLP & Text Mining",
    title: "Text Mining Scientific Literature for Ecological Trends",
    text: "Natural language processing extracts structured knowledge from millions of unstructured ecological research papers. Topic modeling with latent dirichlet allocation identifies research themes across large document corpora. Named entity recognition tags species mentions, geographic locations, and environmental conditions automatically. Semantic similarity measures enable literature recommendation systems that surface relevant prior work for researchers."
  },
  {
    id: 8,
    category: "Data Science",
    title: "Anomaly Detection in Environmental Sensor Networks",
    text: "Wireless sensor networks deployed in forests, wetlands, and rivers generate continuous streams of temperature, humidity, and chemical measurements. Isolation forests and autoencoders detect anomalous readings that may indicate sensor failure or genuine environmental events. Real-time alerting pipelines notify ecologists when unusual conditions are detected across distributed monitoring stations. Data quality assurance is critical before downstream modeling in ecological research."
  },
  {
    id: 9,
    category: "Ecology",
    title: "Invasive Species Spread Modeled with Reaction-Diffusion Equations",
    text: "Mathematical models describe how invasive species propagate across landscapes as traveling waves of population density. Reaction-diffusion partial differential equations capture local population growth coupled with spatial dispersal. Climate change alters habitat suitability maps, enabling invasive species to colonize previously inhospitable regions. Early detection through citizen science monitoring data can trigger management responses before establishment occurs."
  },
  {
    id: 10,
    category: "Machine Learning",
    title: "Random Forest Models for Habitat Suitability Prediction",
    text: "Ensemble tree methods combine environmental variables including temperature, precipitation, elevation, and land cover to predict species habitat suitability. SHAP values decompose individual predictions to explain which environmental features drive suitability scores for each location. Cross-validation across spatial folds prevents data leakage caused by spatial autocorrelation in occurrence records. Ensemble predictions from multiple model types reduce uncertainty in suitability maps."
  },
  {
    id: 11,
    category: "Climate Systems",
    title: "Urban Heat Islands and Green Infrastructure Mitigation",
    text: "Cities are warmer than surrounding rural areas due to impervious surface coverage and reduced evapotranspiration. Urban heat islands increase energy demand for cooling and worsen air quality during heat waves. Green roofs, urban forests, and permeable pavements reduce surface temperatures by enabling evaporative cooling. Equity dimensions of heat exposure are important as lower-income neighborhoods often have less tree canopy cover."
  },
  {
    id: 12,
    category: "Statistics",
    title: "Bayesian Hierarchical Models for Multi-Site Ecological Data",
    text: "Hierarchical models pool statistical strength across multiple monitoring sites while accounting for site-level variation. Prior distributions encode ecological knowledge about plausible parameter ranges before observing data. Markov chain Monte Carlo sampling estimates posterior distributions over model parameters given observations. Partial pooling in hierarchical models outperforms both completely separate and fully pooled analyses for ecological data."
  },
  {
    id: 13,
    category: "NLP & Text Mining",
    title: "Sentiment Analysis of Environmental Policy Documents",
    text: "Policy texts encode commitments, hedging language, and political framing around environmental protection. Transformer-based language models fine-tuned on regulatory corpora classify stance and ambiguity in climate policy documents. Temporal analysis reveals shifts in policy language following elections, disasters, or international agreements. Text-based indicators complement quantitative emissions data for tracking commitment credibility."
  },
  {
    id: 14,
    category: "Biodiversity",
    title: "eDNA Sampling for Aquatic Biodiversity Assessment",
    text: "Environmental DNA shed by organisms into water enables detection of species without direct observation. High-throughput sequencing of filtered water samples identifies fish, amphibians, and invertebrates present in aquatic habitats. eDNA methods are less invasive and more sensitive than traditional survey techniques for rare or cryptic species. Contamination control and standardized protocols are essential for reliable cross-site biodiversity comparisons."
  }
];

const EXAMPLE_QUERIES = [
  "machine learning species classification",
  "carbon emissions and deforestation",
  "NLP text mining documents",
  "sensor anomaly detection",
  "bee pollinator agriculture",
  "Arctic warming feedback"
];
