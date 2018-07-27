////////////////////////////////////////////////////
///auto focus on the first input field on page load/
////////////////////////////////////////////////////
$('document').ready(function autoFocus() {
	$('#name').focus();
});
/////////////////////////////////////////////////
 //If other is selected, show and focus on input//
/////////////////////////////////////////////////
$("#other-title").hide();
$('#title').change(function() {
    if($(this).val() == 'other') {
        $('#other-title').show().focus();	
		}else {
        $('#other-title').hide();
	}
});
////////////////////////////////////////////////////////////////////
///Hide color div by default, show if selected, and filter options//
////////////////////////////////////////////////////////////////////
$('#colors-js-puns').hide();
$("#design").change(function () {
	$("#colors-js-puns").show();
	const designSelection = $('#design').val();
	if(designSelection === "js puns") {
		$("#color").children().show();
		$("#color option[value= 'cornflowerblue']").attr("selected",true);
		$("#color option:nth-child(1n + 4)").css("display", "none");
		$("#color option[value= 'tomato']").attr("selected",false);
		} else if(designSelection === "heart js") {
				$("#color").children().show();
				$("#color option[value= 'tomato']").attr("selected",true);
			 	$("#color option:nth-child(-1n + 3)").css("display", "none");
				$("#color option[value= 'cornflowerblue']").attr("selected",false);
			}
	$("#select-theme").hide();
});


/////////////////////////////////////////////////////////////
//calculate the total cost of selected courses//////////////
///////////////////////////////////////////////////////////
let sum = 0;
$('.activities').append("<div class= 'totalCost'></div>");
$("input[type='checkbox']").change(function (e) {
	const labelText = e.target.parentNode.textContent;
		 if (e.target.checked === true) {
			if (labelText.includes('$100')) 
			{
			  sum += 100;
				} else if (labelText.includes('$200')) 
				{
				  sum += 200;
				}
		  } else if(labelText.includes('$100') && sum > 0) 
			{
			  sum -= 100;
			} else if (labelText.includes('$200') && sum > 100)
			{
			  sum -= 200;
			}

			$('.totalCost').html("$" + sum);
	
		}); 
//////////////////////////////////////////////////////////
///Add classes to checkbox labels and ID's to the inputs//
/////////////////////////////////////////////////////////
const inputLabel = $("input[type='checkbox']").parent("label")
const input =$("input[type='checkbox']");

for(let i = 0; i < inputLabel.length; i++) {
	const labelText = inputLabel[i].textContent;
	input.addClass("courses"); //This class for use later in form validation
	if(labelText.includes("Tuesday 9am-12pm")) {
		$(inputLabel[i]).addClass("tuesdayAM" + i);
		$(input[i]).attr("id", "TuesAM" + i);
			} else if(labelText.includes("Tuesday 1pm-4pm")) {
				$(inputLabel[i]).addClass("tuesdayPM" + i);
				$(input[i]).attr("id", "TuesPM" + i);
	}
}
////////////////////////////////////////
//Disable checkbox inputs, style labels/
////////////////////////////////////////
$("input[type='checkbox']").change(function () {
if(document.getElementById('TuesAM1').checked) {
	$("#TuesAM3").prop('disabled', true);
	$(".tuesdayAM3").css("color", "#C8C8C8");
		} else { 
			$("#TuesAM3").prop('disabled', false);
			$(".tuesdayAM3").css("color", "#000");
		}	
if(document.getElementById('TuesAM3').checked) {	
	$("#TuesAM1").prop('disabled', true);
	$(".tuesdayAM1").css("color", "#C8C8C8");
		} else { 
			$("#TuesAM1").prop('disabled', false);
			$(".tuesdayAM1").css("color", "#000");
		}
if(document.getElementById('TuesPM2').checked) {
	$("#TuesPM4").prop('disabled', true);
	$(".tuesdayPM4").css("color", "#C8C8C8");
		} else { 
			$("#TuesPM4").prop('disabled', false);
			$(".tuesdayPM4").css("color", "#000");
		}
if(document.getElementById('TuesPM4').checked) {
	$("#TuesPM2").prop('disabled', true);
	$(".tuesdayPM2").css("color", "#C8C8C8");
		} else { 
			$("#TuesPM2").prop('disabled', false);
			$(".tuesdayPM2").css("color", "#000");
		}


}); 
////////////////////////////////////////////////////////////////////
//Show or hide payment option Divs depending on seclection option //
///////////////////////////////////////////////////////////////////
const paypal =  $('#credit-card').next();
const bitcoin = paypal.next();
const creditCard = $('#credit-card');
const paymentDropdown = $('#payment');
$(paymentDropdown).val("credit card");
$("#payment option[value='select_method']").hide();
const paymentOptions = paymentDropdown.children();


paymentDropdown.change(function () {
	$(paymentOptions[0]).hide();
	if(paymentDropdown.val() === 'paypal') {
		creditCard.hide();
		bitcoin.hide();
		paypal.show();
	} else if(paymentDropdown.val() === 'bitcoin') {
		bitcoin.show();
		creditCard.hide();
		paypal.hide();
	}	 else if(paymentDropdown.val() === 'credit card') {
		bitcoin.hide();
		creditCard.show();
		paypal.hide();
	}							
});

////////////////////////////////////////////////////////////////////
//Form Validation                                                 //
///////////////////////////////////////////////////////////////////
const form = $('form');
const validFields = $("#name, #mail, #cc-num, #zip, #cvv");
const errorSpan = $("<span class='errorMessage'></span>").insertAfter(validFields);
const activitiesSpan = $('.activities legend').append("<span class='errorMessage activitiesSpan'</span>");
const spanList = $('.errorMessage');
spanList.css({"color": "red", "font-size": "13px", "font-weight": "bold", "margin-bottom": "5px"});
for(let i=0; i < spanList.length; i++) {
	const spanNumber = i + 1;
	$(spanList[i]).addClass("span" + spanNumber);
}

form.submit(function () {
	
	const name = $('#name');
	const mail= $('#mail');
	const activity = $('.activities');
	const classes = activity.children();
	const ccNum = $('#cc-num');
	const zip = $('#zip');
	const cvv = $("#cvv");
	const emailAddress = $('#mail').val();
	const validateEmail = (email) => 
	{
    let re = /\S+@\S+\.\S+/;
    return re.test(email);

	};
	const errorMessage = (input,spanClass,spanText) => {
		validFields.css("margin-bottom", "0px");
		event.preventDefault();
		input.css("border-color", "red");
		$(spanClass).html(spanText);
		return false;
		
};
	if(name.val() === "") {
		errorMessage(name,$('.span1'),"You forgot your name, silly");
	} 
	if(validateEmail(emailAddress) === false) {
		errorMessage(mail,$(".span2"),"A valid email address is required");
	} 
	if($(classes).prop('checked') === false) {
		activity.css("border", "solid 1px blue");
	}
	if($( 'input[class^="courses"]:checked' ).length === 0) {	
		errorMessage($('.activities legend'), $('.activitiesSpan'),"You must enroll in atleast one course");
		$('.activitiesSpan').css("margin-left", "10px");
	}
	if($('#payment').val() === "credit card") {
		if(ccNum.val().length < 13 || ccNum.val().length > 16 ) {
			alert(ccNum.val().length);
			errorMessage(ccNum,$(".span4"),"Card number must be between 13 and 16 digits");
			}  
	}
	if(zip.val().length !== 5) {
		errorMessage(zip,$(".span5"),"Please enter your zip code");
	}
	if(cvv.val().length !== 3) {
		errorMessage(cvv,$(".span6"),"3 digit number is required");
	}		
});


				 
