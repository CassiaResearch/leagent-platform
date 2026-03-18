import { notFound } from 'next/navigation';
import ExperimentPage from '../../components/ExperimentPage';
import { getExperiment } from '../../lib/experiments';
import { buildAttribution, readVariant } from '../../lib/tracking';

export async function generateMetadata({ params }) {
  const resolved = await params;
  const experiment = getExperiment(resolved.slug);
  if (!experiment) return {};
  return {
    title: experiment.pageTitle,
    description: experiment.metaDescription
  };
}

export default async function DynamicExperimentPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const experiment = getExperiment(resolvedParams.slug);

  if (!experiment) notFound();

  const variant = readVariant(resolvedSearchParams, experiment);
  const attribution = buildAttribution(resolvedSearchParams);

  return <ExperimentPage experiment={experiment} variant={variant} attribution={attribution} />;
}
