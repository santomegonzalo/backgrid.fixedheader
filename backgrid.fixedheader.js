/*!
 * backgrid.fixedheader. The jQuery plugin to make backgrid with Fixed header
 *
 * Copyright (c) 2013 Gonzalo Santome
 * http://www.boxdm.com
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * http://docs.jquery.com/Plugins/Authoring
 * jQuery authoring guidelines
 *
 * Launch  : October 2013
 * Version : 0.1.0
 * Released: Dec 11th, 2013
 *
 */

(function ( $ ) {
	"use strict";
	
	$.backgridFixedHeader = function( options ) {
		var VERSION = "0.1.0";
		
		var settings = {};
		
		var defaults = {
			gridHeader: undefined	
		};
		
		/*
		 * Public methods
		 */
		var methods = {
			init: function(options) {
				//merge the options
				settings = $.extend({}, defaults, options);
				
				//setting the scroll event
				settings.container.bind('scroll', helpers._scrollingContainer);
				//setting the window size event
				$(window).bind('resize', helpers._resize);
				
				//generate the header backgrid
				helpers._generateHeader.apply(this);
				
				//render everything
				helpers._render.apply(this);
			}			
		};
		
		/*
		 * Private methods
		 */
		var helpers = {
			_render: function() {
				helpers._generateHeader.apply(this);
				
				//add the containers for the grids ==>
				settings.container.append('<div class="backgrid-fixed-header"></div>');
				settings.container.append('<div class="backgrid-fixed-content"></div>');
				// <==
				
				settings.container.find('.backgrid-fixed-content').bind('scroll', helpers._scrollingContainer);
				
				// render both grids ==>
				settings.grid.render();
				settings.gridHeader.render();
				// <==
				// append elements to containers ==>
				settings.container.find('.backgrid-fixed-header').append(settings.gridHeader.$el);
				settings.container.find('.backgrid-fixed-content').append(settings.grid.$el);
				// <==
				//execute new backgrid actions ==>
				settings.gridHeader.removeBodyAction();
				settings.grid.fixedHeaderAction();
				// <==
			},
			_generateHeader: function() {
				settings.gridHeader = new Backgrid.Grid({
					columns: settings.grid.columns,
					collection: settings.grid.collection,
					removeBody: true
				});
				
				//listen when the collection get more items
				settings.grid.collection.bind("add", function(){
					helpers._resize();
				});
			},
			_scrollingContainer: function(evt) {
				var $element = $(evt.target);
				var top = $element.scrollTop();
				var left = $element.scrollLeft();
				
				settings.container.find('.backgrid-fixed-header').css('margin-left', -Math.abs(left));
				
				if( settings.container.find('.backgrid-fixed-content').scrollTop() >= settings.container.find('.backgrid-fixed-content').find('.backgrid').height() - settings.container.find('.backgrid-fixed-content').height() - 100) {
					$.event.trigger('BackgridContainer:scrollEnd');
				}
			},
			_resize: function(evt) {
				var width = settings.container.find('.backgrid-fixed-content').find('.backgrid').width();
				settings.container.find('.backgrid-fixed-header').width(width);
			}
		}
		
		methods.init.apply(this, arguments);
	};
	
}( jQuery ));