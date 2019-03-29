// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html";
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
import "bootstrap";

// Document Ready event
$(function () {
// /ajax/timeblocks/

	// function update_ttime(task_id) {
	// 	$.ajax(`${"/ajax/timeblocks/"}?task_id=${task_id}` , {
	// 		method: "get",
	// 		dataType: "json",
	// 		contentType: "application/json; charset=UTF-8",
	// 		data: "",
	// 		success: (resp) => {
	// 			console.log(resp);

	// 		},
	// 	});
	// }

	// For adding a new timeblock and editting
	$("#add_timeblock").click((ev) => {
		
		let start_tb = $("#start_timeblock").val();
		let end_tb = $("#end_timeblock").val();
		let task_id = $(ev.target).data('task-id');

		// Fix offset
		start_tb = new Date(start_tb);
		start_tb.setHours(start_tb.getHours() - 4);
		
		end_tb = new Date(end_tb);
		end_tb.setHours(end_tb.getHours() - 4);

		// let hours = Math.round(Math.abs(end_tb - start_tb) / 36e5);

		if (start_tb != "" && end_tb != "") {
			let text = JSON.stringify({
				timeblock: {
					start: start_tb,
					end: end_tb,
					task_id: task_id
				},
			});
			console.log(text);
			if ($("#add_timeblock").html() == "Add Timeblock") {
				$.ajax("/ajax/timeblocks", {
					method: "post",
					dataType: "json",
					contentType: "application/json; charset=UTF-8",
					data: text, 
					success: (resp) => {
						location.reload();
						// $("#ttime").val($("#ttime").val() + hours);
						//update_ttime(task_id);
					},
				});
			}
			else {
				let tb_id = $(ev.target).data('timeblock');
				$.ajax("/ajax/timeblocks/" + tb_id, {
					method: "put",
					dataType: "json",
					contentType: "application/json; charset=UTF-8",
					data: text, 
					success: (resp) => {
						location.reload();
						
					},
				});
				// $("#ttime").val(parseInt($("#ttime").val()) + hours - prev_time);
				$("#add_timeblock").html("Add Timeblock");
			}
		}
	});

	var start_timer; // needed to store the start time of timer
	// For start and stop working
	$("#timer").click((ev) => {
		let val = $("#timer").html();
		console.log(val);
		if (val == "Start Working") {
			$("#timer").html("Stop Working");
			start_timer = new Date();

			$("#timer").removeClass("btn btn-info").addClass("btn btn-danger");
		}
		else {
			$("#timer").html("Start Working");
			let end_timer = new Date();
			let task_id = $(ev.target).data('task-id');

			$("#timer").removeClass("btn btn-danger").addClass("btn btn-info");

			// offset issues
			start_timer.setHours(start_timer.getHours() - 4);
			end_timer.setHours(end_timer.getHours() - 4);

			// let hours = Math.round(Math.abs(end_timer - start_timer) / 36e5);

			let text = JSON.stringify({
				timeblock: {
					start: start_timer,
					end: end_timer,
					task_id: task_id
				},
			});

			$.ajax("/ajax/timeblocks", {
				method: "post",
				dataType: "json",
				contentType: "application/json; charset=UTF-8",	
				data: text,
				success: (resp) => {
					location.reload();
					// $("#ttime").val(parseInt($("#ttime").val()) + hours);
				},
			});
		}		
	});
	// var prev_time;
	// For editting timeblocks
	window.edit_tb = (ev) => {
		let start_to_edit = $(ev).data('tb-start');
		let end_to_edit = $(ev).data('tb-end');
		let tb_to_edit = $(ev).data('tb-id');


		$("#add_timeblock").html("Save");
		$("#add_timeblock").attr("data-timeblock", tb_to_edit);
		$("#cancel_changes").removeClass("d-none").addClass("btn btn-danger");
		$("#start_timeblock").val(start_to_edit.substring(0, start_to_edit.length - 1));
		$("#end_timeblock").val(end_to_edit.substring(0, end_to_edit.length - 1));
		start_to_edit = new Date(start_to_edit);
		end_to_edit = new Date(end_to_edit);
		// prev_time = Math.round(Math.abs(end_to_edit - start_to_edit) / 36e5);
	}

	// cancel changes
	$("#cancel_changes").click((ev) => {
		$("#start_timeblock").val("");
		$("#end_timeblock").val("");
		$("#cancel_changes").removeClass("btn btn-danger").addClass("d-none");
		$("#add_timeblock").html("Add Timeblock");
	});

	// For deleting timeblocks
	window.delete_tb = (ev) => {
		let timeblock = $(ev).data('timeblock-id');

		let start_delete = $(ev).data('tb-start');
		let end_delete = $(ev).data('tb-end');
		start_delete = new Date(start_delete);
		end_delete = new Date(end_delete);

		// let hours = Math.round(Math.abs(end_delete - start_delete) / 36e5);

		console.log(timeblock);

		$.ajax("/ajax/timeblocks/" + timeblock, {
			method: "delete",
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			success: (resp) => {
				location.reload();
				// $("#ttime").val($("#ttime").val() - hours);
			},
		});
	}

});

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"
