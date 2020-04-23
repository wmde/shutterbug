# TODO

## Improvements for known bugs/shortcomings
- [ ] Repair headers: Generate the hierarchical row headers from the Y Axis order selection. Display depending on number of levels: 
	- 1 Level: Display headers in vertical header column
	- 2 Levels: Display 1st level headers as separate subsection rows, display 2nd level headers in vertical header column
	- more levels: Like 2 levels, display additional headers underneath each image
- [ ] Display helpful error message in stage when the metadata file failed to load, parse, or create the ScreenshotMetadata instance
- [ ] Display "loading" in the stage area while loading the ScreenshotMetadata
- [ ] More validation (dimensions) when creating ScreenshotMetadata
- [ ] Page scrolls while navigating with arrows keys in zoomed image
- [ ] Disable navigation arrows in zoomed view when they wouldn't do anything (at the egdes of the grid)
- [ ] Preserve image aspect ratio in overview, to visually distinguish between image sizes.

## New features
- [ ] Hosting: Put shutterbug on a public page.
- [ ] Show navigation view to switch between tests. This means that the static `screenshots` 
	  directory will contain 1 more level, one for each campaign run. The directory name
	  will be a state in `App` and can be changed through the URL. When no directory is
	  selected, show selection view.
- [ ] Display date when the images were generated (date is already part of the Metadata)
- [ ] Find a way to have fewer empty cells from invalid tests due to unsupported browsers
	of the platform or unsupported resolutions on Linux. Talk to UX to comue up with
	solutions
- [ ] Hide unneccessary columns, e.g. show only Firefox A/B tests.
- [ ] Have a set of preset selections for common comparisons.
