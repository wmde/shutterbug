export interface SummarizedMetadata {
	campaign: string,
	createdOn: string|number,
	testCaseCount: number
}

export function compareCampaigns( metadataA: SummarizedMetadata, metadataB: SummarizedMetadata ): number {
	// campaign names follow the pattern <CHANNEL><TESTNUMBER>-ba-<START_DATE>
	// Examples: 03-ba-220801, en02-ba-201112
	// We sort by start date
	const aDateString = metadataA.campaign.split("-").pop()
	const bDateString = metadataB.campaign.split("-").pop()
	return ( aDateString < bDateString ? -1 : ( aDateString > bDateString ? 1 : 0 ));
}
