$(document).ready(function() {

  var object = {
  	storage: []
  };

  $('.setData').on('click', function() {
    var saveSnippet = function() {
    	var tempObj = {};
    	var tempArr = [];
    	let snippetName = $('.textField').val();
    	let snippet = $('.textSnippet').val();
    	tempObj.name = snippetName;
    	tempObj.code = snippet;
    	tempArr.push(tempObj);
        object.storage.push(tempArr);
    }
    saveSnippet();
    $('.textField').val('');
    $('.textSnippet').val('');
    localStorage.setItem('storedSnippets', JSON.stringify(object));
  });

  $('.getData').on('click', function(){
  	$('.snippet').remove();
  	$('.notFound').remove();
  	let search = $('.searchSnippets').val();
  	if(!search) {
  		$('.debug').append(`<div class='notFound'>Please input snippet</div>`);
  	}
  	let retrieveData = localStorage.getItem('storedSnippets');
  	let obj = JSON.parse(retrieveData); // makes data iterable for searching
  	let found = false;
  	for (var i = 0; i < obj.storage.length; i++) { // iterate over obj.storage array
  		let currentItem = obj.storage[i][0];
  		let name = currentItem.name;
  		let codeSnippet = currentItem.code;
  		if (name === search) {
  			$('.debug').append(`<div class='snippet'>${name}</div><br><code class='snippet'>${codeSnippet}</code></div>`);
  			$('.searchSnippets').val('');
  			found = true;
  		}
  	}
    if (found === false && search) {
  	  $('.debug').append(`<div class='notFound'>No matching results</div>`);
    }
  });

  $('.showAll').on('click', function() {
  	$('.snippet').remove();
  	let retrieveData = localStorage.getItem('storedSnippets');
  	let obj = JSON.parse(retrieveData);
  	for (var i = 0; i < obj.storage.length; i++) {
  		let currentItem = obj.storage[i][0];
  		let codeSnippet = currentItem.code;
  		let name = currentItem.name;
  		$('.debug').append(`<div class='snippet'>${name}</div><figure><code class='snippet'>${codeSnippet}</code></firgure>`);
  	}
  });

});

