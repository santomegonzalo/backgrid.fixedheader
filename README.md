Introduction
====================

Backgrid don't support fixed header and sometime this feature is really necessary. 

This plugin will make the fix header on your tables with backgrid. 

It's ready to use on production but if someone want to help it's not a problem… maybe it will be nice to make everything inside backgrid.

How to use
==========

Changes on Backgrid
-------------------
1- Add two variables in Grid (removeHeader, removeBody)
    
    var Grid = Backgrid.Grid = Backbone.View.extend({  
    	removeHeader: false,  
    	removeBody: false,  

2- Inside initialize add this code (Inside Grid)

    if( options.removeHeader ) {
    	this.removeHeader = options.removeHeader;
    }
    
    if( options.removeBody ) {
    	this.removeBody = options.removeBody;
    }
    
3- Add this functions inside Grid

     removeBodyAction: function() {
       if( this.removeBody ) {
          this.$el.addClass('remove_body');
       }
     },
     fixedHeaderAction: function() {
       if( this.removeHeader ) {
          this.$el.addClass('remove_header');
       }
     },

Using the plugin
--
     $.backgridFixedHeader({
       grid: this.grid, //this is the grid variable
       container: this.$el.find('.backgrid-container') //this is the container where you want to put backgrid
     });

instead of 

     this.$el.find('.backgrid-container').append(this.grid.render().$el);


Making some changes on CSS
--
The container need to have  <b>overflow: hidden;</b> and <b>position: relative;</b>. Don't forget to add the css file too.
