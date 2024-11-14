<template>
    <div class="page-overview">
        <h1 class="page-overview-heading">Campaign overview</h1>
        <div v-if="lastError" class="error">
            <h2 class="error__title">Error</h2>
            <div class="error__message">There was an error loading the overview.</div>
        </div>
        <ol v-if="!isLoading" class="folders">
			<li v-for="( channelFolders, channelName)  in folders" :key="channelName" class="channelArea">
				<span class="channelArea--headline">{{ channelName }}</span>

				<ol class="channelArea--folder-list">
					<li v-for="subFolder in channelFolders"
						:key="subFolder.campaign"
						class="folders__item folder">
						<router-link
							class="folder__card"
							:to="`/slides/${subFolder.campaign}`">
							<Icon :icon="'folder'" class="folder__icon"></Icon>
							{{ subFolder.campaign }}<br>
							<i class="folder__info" >( {{ subFolder.testCaseCount }} tests, generated on {{ subFolder.createdOn.replace("T"," ").replace(/[0-9.]{4}Z$/,"")}} )</i>
						</router-link>
					</li>
				</ol>

			</li>

        </ol>
		<div v-else-if="!lastError">Loading overview ...</div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, toRefs, watchEffect} from "vue";
	import Icon from "@/components/Icon.vue";
	import { compareCampaigns, SummarizedMetadata } from "@/model/compareCampaigns";

    export default defineComponent( {
        name: "ScreenshotOverview",
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
				const desktopDERegex = new RegExp(/^\d{2}/);
				overviewState.folders.desktop_de = campaigns.filter( ( { campaign } ) => campaign.match( desktopDERegex ) );

				const mobileDERegex = new RegExp(/^mob-\d{2}/);
				overviewState.folders.mobile_de = campaigns.filter( ( { campaign } ) => campaign.match( mobileDERegex ) );

				const padDERegex = new RegExp(/^pad/);
				overviewState.folders.pad_de = campaigns.filter( ( { campaign } ) => campaign.match( padDERegex ) );

				const desktopENRegex = new RegExp(/^en/);
				overviewState.folders.desktop_en = campaigns.filter( ( { campaign } ) => campaign.match( desktopENRegex ) );

				const mobileENRegex = new RegExp(/^mob_en/);
				overviewState.folders.mobile_en = campaigns.filter( ( { campaign } ) => campaign.match( mobileENRegex ) );
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
                    console.log('Error loading overview:', e);
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
        margin-top: $header-height;
        padding: $header-height;
		height: 100vH;

        &-heading {
            margin-bottom: 20px;
        }

		.channelArea {
			width: 26%;
			margin: 15px 30px;

			&--headline {
				font-weight: bold;
				font-size: 20px;

				border: 2px solid grey;
				border-bottom: 0;
				padding: 5px 5px 0;
				border-radius: 8px 8px 0 0;
			}

			&--folder-list {
				height: 50vH;
				overflow: scroll;
				border: 2px solid #000000;
				padding-top: 15px;
				padding-bottom: 15px;
				background: #edf1ea;
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

                @media (min-width: 950px) {
                    width: 50%;
                }
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
                margin: 0 math.div($stage-gutter,2) 15px;
                padding: 15px 15px 15px 80px;
                border: 1px solid $border-color;
				border-radius: 8px;
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
