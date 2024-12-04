<template>
	<div class="page-overview">
		<h1 class="page-overview-heading">Campaign overview</h1>
		<div v-if="lastError" class="error">
			<h2 class="error__title">Error</h2>
			<div class="error__message">There was an error loading the overview.</div>
		</div>
		<ol v-if="!isLoading" class="folders">
			<li v-for="( channelFolders, channelName)  in folders" :key="channelName" class="channelArea">
				<h3 class="channelArea__headline">{{ channelName }}</h3>

				<ol class="channelArea__folder-list">
					<li v-for="subFolder in channelFolders"
						:key="subFolder.campaign"
						class="folders__item folder">
						<router-link
							class="folder__card"
							:to="`/slides/${subFolder.campaign}`">
							<Icon :icon="'folder'" class="folder__icon"></Icon>
							{{ subFolder.campaign }}<br>
							<i class="folder__info">( {{ subFolder.testCaseCount }} tests, generated on
								{{ subFolder.createdOn.replace( 'T', ' ' ).replace( /[0-9.]{4}Z$/, '' ) }} )</i>
						</router-link>
					</li>
				</ol>

			</li>

		</ol>
		<div v-else-if="!lastError">Loading overview ...</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect } from 'vue';
import Icon from '@/components/Icon.vue';
import { compareCampaigns, SummarizedMetadata } from '@/model/compareCampaigns';

export default defineComponent( {
	name: 'ScreenshotOverview',
	components: {
		Icon
	},
	setup() {
		const overviewStateInit = {
			isLoading: true,
			lastError: '',
			folders: {
				desktop_de: [],
				mobile_de: [],
				pad_de: [],
				desktop_en: [],
				mobile_en: [],
			}
		}

		const splitCampaignsIntoChannelFolders = ( overviewState, campaigns ) => {
			const desktopDERegex = new RegExp( /^\d{2}/ );
			const mobileDERegex = new RegExp( /^mob-\d{2}/ );
			const padDERegex = new RegExp( /^pad/ );
			const desktopENRegex = new RegExp( /^en/ );
			const mobileENRegex = new RegExp( /^mob_en/ );

			campaigns.forEach( ( campaign ) => {
				if( campaign.campaign.match( desktopDERegex ) ) {
					overviewState.folders.desktop_de.push( campaign );
				}
				else if ( campaign.campaign.match( mobileDERegex ) ) {
					overviewState.folders.mobile_de.push( campaign );
				}
				else if( campaign.campaign.match( padDERegex ) ) {
					overviewState.folders.pad_de.push( campaign );
				}
				else if( campaign.campaign.match( desktopENRegex ) ) {
					overviewState.folders.desktop_en.push( campaign );
				}
				else if( campaign.campaign.match( mobileENRegex ) ) {
					overviewState.folders.mobile_en.push( campaign );
				}
			} )
		}

		const overviewState = reactive( overviewStateInit );
		watchEffect( () => {
			fetch( 'screenshots/metadata_summary.json' )
				.then( response => response.json() )
				.then( ( campaigns: SummarizedMetadata[] ) => {
					campaigns.sort( compareCampaigns );
					campaigns.reverse();
					overviewState.isLoading = false;
					splitCampaignsIntoChannelFolders( overviewState, campaigns );
				} )
				.catch( e => {
					console.log( 'Error loading overview:', e );
					overviewState.lastError = e;
				} )
		} );

		return {
			...toRefs( overviewState )
		}
	}
} );
</script>

<style lang="scss">
@import "../assets/settings";

.page-overview {
	margin-top: 30px;
	padding: 45px;
	height: 100vH;

	&-heading {
		margin-bottom: 20px;
	}

	.channelArea {
		width: 45%;
		margin: 0 0 0 35px;

		@media (min-width: 1100px) {
			width: 30%;
		}

		&__headline {
			display: inline-block;
			font-weight: bold;
			font-size: 20px;
		}

		&__folder-list {
			height: 36vH;
			overflow: scroll;
			border: 1px solid #808080;
			padding-top: 15px;
			padding-bottom: 15px;
			background: #d5d5d5;
		}
	}

	.folders {
		margin: 0 math.div(-$stage-gutter, 2);
		display: flex;
		flex-wrap: wrap;
		align-content: stretch;
		height: 100%;

		&__item {
			width: 100%;
		}
	}

	.folder {
		list-style: none;
		margin: 0;
		line-height: 1.2;
		width: 100%;

		&__card {
			position: relative;
			display: block;
			text-decoration: none;
			color: $font-color-dark;
			background: #ffffff;
			margin: 0 12px 10px 10px;
			padding: 15px 15px 15px 80px;
			border: 1px solid $border-color;
			border-radius: 3px;
			box-shadow: 2px 2px gray;

			&:hover, &:focus {
				border-color: $overview-border-hover;
			}
		}

		&__icon {
			position: absolute;
			top: 50%;
			left: 18px;
			height: 50px;
			width: 50px;
			margin-top: -25px;
		}

		&__title:hover {
			text-decoration: underline;
		}

		&__info {
			color: $font-color-secondary;
			font-size: 14px;
		}
	}
}

</style>
