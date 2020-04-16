<template>
    <form class="sidebar">

        <fieldset>
            <legend>X-Axis</legend>
            <form-dropdown></form-dropdown>
            <form-dropdown></form-dropdown>
            <form-dropdown></form-dropdown>
        </fieldset>

        <fieldset>
            <legend>Y-Axis</legend>
            <form-dropdown></form-dropdown>
            <form-dropdown></form-dropdown>
            <form-dropdown></form-dropdown>
        </fieldset>

        <input type="submit" value="Generate Screenshots" />

    </form>
</template>

<script>
	import FormDropdown from "@/components/FormDropdown";
	export default {
		name: "Sidebar",
		components: { FormDropdown }
	}
</script>

<style>
    .sidebar {
        display: none;
    }
</style>