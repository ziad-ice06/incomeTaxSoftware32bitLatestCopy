 var db = openDatabase('mydb', '1.0', 'my first database', 100*1024*1024,console.log('db connection opened'));

		 

		function create_tax_table (argument) {
			// body...
			db.transaction(function (tx) {
			  tx.executeSql('CREATE TABLE IF NOT EXISTS tax_payer (id INTEGER PRIMARY KEY, name VARCHAR, nid VARCHAR, etin VARCHAR, tin VARCHAR, circle VARCHAR, tax_area VARCHAR, tax_year VARCHAR, sex VARCHAR, residency VARCHAR, status VARCHAR, company VARCHAR, company_address VARCHAR, spouse VARCHAR, f_name VARCHAR, m_name VARCHAR, birthday VARCHAR, c_sfield VARCHAR, c_holding VARCHAR, c_road VARCHAR, c_village VARCHAR, c_post VARCHAR, c_upazila VARCHAR, c_district VARCHAR, cp_address VARCHAR, p_sfield VARCHAR, p_holding VARCHAR, p_road VARCHAR, p_village VARCHAR, p_post VARCHAR, p_upazila VARCHAR, p_district VARCHAR, m_address VARCHAR, phone VARCHAR, vat_num VARCHAR, date VARCHAR)');
			});
		} 

		function delete_tax_table (argument) {
			// body...
			db.transaction(function (tx) {
			  tx.executeSql('DROP TABLE tax_payer');
			});
		}

		function add_tax_payer (msg) {
			// body...
			
			db.transaction(function (tx) {

				var value_list=[$('#name').val(),$('#id-card').val(),$('#etin').val(),$('#tin').val(),$('#circle').val(),$('#tax-area').val(),$('#tax-year').val(),$('#sex').val(),$('#residency').val(),$('#status').val(),$('#company').val(),$('#company_address').val(),$('#spouse').val(),$('#f_name').val(),$('#m_name').val(),$('#birthday').val(),$('#c_sfield').val(),$('#c_holding').val(),$('#c_road').val(),$('#c_village').val(),$('#c_post').val(),$('#c_upazila').val(),$('#c_district').val(),$('#cp_address').val(),$('#p_sfield').val(),$('#p_holding').val(),$('#p_road').val(),$('#p_village').val(),$('#p_post').val(),$('#p_upazila').val(),$('#p_district').val(),$('#m_address').val(),$('#phone').val(),$('#vat_num').val(),$('#date').val()];

					tx.executeSql('INSERT INTO tax_payer ( name, nid, etin, tin, circle, tax_area, tax_year, sex, residency, status, company, company_address, spouse, f_name, m_name, birthday, c_sfield, c_holding, c_road, c_village, c_post, c_upazila, c_district, cp_address, p_sfield, p_holding, p_road, p_village, p_post, p_upazila, p_district, m_address, phone, vat_num, date) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',value_list,function() {
						$("#confirmation").html("New Entry Successfully Added..");
						$("#dynamic_container").html("");
						// edit_form ($('#id').val(),"New Entry Successfully Added..");
						// body...
						// list_tax_payer ("New Entry Successfully Added..");
					});
					
				});

		}

		


var header= '<div class="form panel panel-default" style="margin-top:20px">			<table class="table">		<tr><th><h3>Serial</h3></th><th><h3>Name</h3></th><th><h3>ETIN</h3></th><th><h3>TIN</h3></th><th style="text-align: center;"><h2>Action</h2></th></tr>';

var footer='</table></div>';

		function list_tax_payer (msg) {
			// alert("list called");
			// body...
			$("#confirmation").html(msg);
			db.transaction(function (txx) {
				
				txx.executeSql('SELECT * FROM tax_payer', [], function (txx, results) { 
					//alert(results.rows.length);
				  var len = results.rows.length, i;
				  var items=header;
				  for (i = 0; i < len; i++) {
				    // console.log(results.rows.item(i).value);


				    items+='<tr><td>'+	results.rows.item(i).id	+'</td><td>'+	results.rows.item(i).name	+'</td><td>'+ results.rows.item(i).etin +'</td><td>'+ results.rows.item(i).tin +'</td><td><table class="table"><tr><td style="border-top:0;"><a href="javascript:details_page('+results.rows.item(i).id+')" class="btn btn-primary">Details</a></td><td style="border-top:0;"><a href="javascript:edit_form('+results.rows.item(i).id+',\'Edit Entry\')" class="btn btn-primary">Edit</a></td><td style="border-top:0;"><a href="javascript:delete_entry('+results.rows.item(i).id+')" class="btn btn-primary">Delete</a></td><td style="border-top:0;"><a href="" class="btn btn-primary">Get App Form</a></td><td style="border-top:0;"><a href="javascript:address_page('+results.rows.item(i).id+')" class="btn btn-primary">Send Address</a></td></tr></table></td></tr>';



				  }

				  items+=footer;

				 
			
				  $("#dynamic_container").html(items);
				  
				  // console.log(results);
				});
			});
		}

		function draw_entry_form (argument) {
			// body...
			 // create_tax_table();
			$("#confirmation").html("Add New Tax Payer..");
			$("#dynamic_container").load("add_income_tax.html");
		}

		function delete_entry (id) {
			// body...
			var r=confirm("Are you sure to delete it?");

			if (r==true) {
			db.transaction(function (tx) {
			 tx.executeSql("DELETE FROM tax_payer WHERE ID=?", [id],
			        list_tax_payer("Successfully Deleted"));
			    });
			}
		}

		function details_page (id) {

			// body...
			db.transaction(function (tx) {
				tx.executeSql('SELECT * FROM tax_payer WHERE id=?', [id], function (tx, results) {
			

					$("#details").load("tax_payer_details.html",function(){
								

						
								$('#name').html(results.rows.item(0).name);



								$('#nid').html(results.rows.item(0).nid);


								$('#etin').html(results.rows.item(0).etin);

					
								$('#first3').html(results.rows.item(0).tin.substring(0, 3));

					// alert(results.rows.item(0).tin.substring(3, 6));
								$('#second3').html(results.rows.item(0).tin.substring(3, 6));

					
								$('#last4').html(results.rows.item(0).tin.substring(6, 10));

					
						
								$('#circle').html(results.rows.item(0).circle);

					
						
								$('#tax_area').html(results.rows.item(0).tax_area);

								

								$('#tax_year').html(results.rows.item(0).tax_year);

								
								// $('#sex').val(results.rows.item(0).sex);



								if(results.rows.item(0).residency=='নিবাসী')
								{
								 	$('#nibashi').html('&#10003;');
								//alert(results.rows.item(0).residency);
								}
								else $('#onibashi').html('&#10003;');


								//alert(results.rows.item(0).status);
								 if(results.rows.item(0).status=='ব্যক্তি')
								 {
								 	$('#bekti').html('&#10003;');
								
								 }

								 else if(results.rows.item(0).status=='ফার্ম')
								 {
								 	$('#firm').html('&#10003;');
								
								 }

								 else if(results.rows.item(0).status=='ব্যক্তি সংঘ')
								 {
								 	$('#bekti_shongho').html('&#10003;');
								
								 }

								 else
								 {
								 	$('#hindu_poribar').html('&#10003;');
								
								 }

					
							
								$('#company').html(results.rows.item(0).company);

					
							// alert(results.rows.item(0).sex);
							// alert(results.rows.item(0).spouse);

								$('#spouse').html(results.rows.item(0).spouse);

					
							
								$('#f_name').html(results.rows.item(0).f_name);

					
							
								$('#m_name').html(results.rows.item(0).m_name);

					
							
								$('#birthday').html(results.rows.item(0).birthday);

					
							
								if(results.rows.item(0).c_sfield!="")
								{
									$('#c_sfield').html(results.rows.item(0).c_sfield);
								}
								else
								{
									$('#c_sfield').css("padding-right","0");
								}

					
							
								if(results.rows.item(0).c_holding!="")
								{
									$('#c_holding').html('হোল্ডিংঃ '+results.rows.item(0).c_holding);
								}
								else
								{
									$('#c_holding').css("padding-right","0");
								}

					
							
								if(results.rows.item(0).c_road!="")
								{
									$('#c_road').html('সড়ক নং / নামঃ '+results.rows.item(0).c_road);
								}
								else
								{
									$('#c_road').css("padding-right","0");
								}

					
							
								if(results.rows.item(0).c_village!="")
								{
									$('#c_village').html('মহল্লা / গ্রামঃ '+results.rows.item(0).c_village);
								}
								else
								{
									$('#c_village').css("padding-right","0");
								}

					
							
								if(results.rows.item(0).c_post!="")
								{
									$('#c_post').html('ডাকঘরঃ '+results.rows.item(0).c_post);
								}
								else
								{
									$('#c_post').css("padding-right","0");
								}

					
							
								if(results.rows.item(0).c_upazila!="")
								{
									$('#c_upazila').html('উপজিলাঃ '+results.rows.item(0).c_upazila);
								}
								else
								{
									$('#c_upazila').css("padding-right","0");
								}

					
							
								if(results.rows.item(0).c_district!="")
								{
									$('#c_district').html('জিলাঃ '+results.rows.item(0).c_district);
								}
								else
								{
									$('#c_district').css("padding-right","0");
								}

					 
							// alert(results.rows.item(0).cp_address);
								if(results.rows.item(0).cp_address=="same")
								{
									$('#p_address').html('ঐ').css("padding-left","225px");
								}
								else
								{
									if(results.rows.item(0).p_sfield!="")
									{
										$('#p_sfield').html(results.rows.item(0).p_sfield);
									}
									else
									{
										$('#p_sfield').css("padding-right","0");
									}
									

									if(results.rows.item(0).p_holding!="")
									{
										$('#p_holding').html('হোল্ডিংঃ '+results.rows.item(0).p_holding);
									}
									else
									{
										$('#p_holding').css("padding-right","0");
									}

						
									if(results.rows.item(0).p_road!="")
									{
										$('#p_road').html('সড়ক নং / নামঃ '+results.rows.item(0).p_road);
									}
									else
									{
										$('#p_road').css("padding-right","0");
									}
						
								
									if(results.rows.item(0).p_village!="")
									{
										$('#p_village').html('মহল্লা / গ্রামঃ '+results.rows.item(0).p_village);
									}
									else
									{
										$('#p_village').css("padding-right","0");
									}
						
								
									if(results.rows.item(0).p_post!="")
									{
										$('#p_post').html('ডাকঘরঃ '+results.rows.item(0).p_post);
									}
									else
									{
										$('#p_post').css("padding-right","0");
									}
						
								
									if(results.rows.item(0).p_upazila!="")
									{
										$('#p_upazila').html('উপজিলাঃ '+results.rows.item(0).p_upazila);
									}
									else
									{
										$('#p_upazila').css("padding-right","0");
									}

						
								
									if(results.rows.item(0).p_district!="")
									{
										$('#p_district').html('জিলাঃ '+results.rows.item(0).p_district);
									}
									else
									{
										$('#p_district').css("padding-right","0");
									}
								}

					
							
								$('#phone').html(results.rows.item(0).phone);

					
							
								$('#vat_num').html(results.rows.item(0).vat_num);


								$('#iyedate').html('30-6-'+results.rows.item(0).tax_year.substring(0, 4));


								$('#p2name').html(results.rows.item(0).name);


								if( (results.rows.item(0).sex=='female') && (results.rows.item(0).spouse!="") )
								{
									$('#guardian').html(results.rows.item(0).spouse);
									$('#p2guardiantick').html('&#10003;').css("left","455px");
								}
								else
								{
									$('#guardian').html(results.rows.item(0).f_name);
									$('#p2guardiantick').html('&#10003;').css("left","430px");
								}



								if(results.rows.item(0).etin!="")
								{
									$('#p2tin').html(results.rows.item(0).etin);
									$('#p2tintick').html('&#10003;').css("left","120px");
								}
								else
								{
									// alert(results.rows.item(0).tin.substring(0, 3)+'-'+results.rows.item(0).tin.substring(3, 6)+'-'+results.rows.item(0).tin.substring(6, 10));
									$('#p2tin').html(results.rows.item(0).tin.substring(0, 3)+'-'+results.rows.item(0).tin.substring(3, 6)+'-'+results.rows.item(0).tin.substring(6, 10));
									$('#p2tintick').html('&#10003;').css("left","180px");
								}


								

								$('#p3name').html(results.rows.item(0).name);


								if(results.rows.item(0).etin!="")
								{
									$('#p3tin').html(results.rows.item(0).etin).css({"left":"465px","letter-spacing":"16px"});
								}
								else
								{
									// alert(results.rows.item(0).tin.substring(0, 3)+'-'+results.rows.item(0).tin.substring(3, 6)+'-'+results.rows.item(0).tin.substring(6, 10));
									$('#p3tin').html(results.rows.item(0).tin.substring(0, 3)+' '+results.rows.item(0).tin.substring(3, 6)+' '+results.rows.item(0).tin.substring(6, 10)).css({"left":"463px","letter-spacing":"17px"});
								}



								

								$('#p5name').html(results.rows.item(0).name);


								if(results.rows.item(0).etin!="")
								{
									$('#p5tin').html(results.rows.item(0).etin).css({"left":"467px","letter-spacing":"16px"});
								}
								else
								{
									// alert(results.rows.item(0).tin.substring(0, 3)+'-'+results.rows.item(0).tin.substring(3, 6)+'-'+results.rows.item(0).tin.substring(6, 10));
									$('#p5tin').html(results.rows.item(0).tin.substring(0, 3)+' '+results.rows.item(0).tin.substring(3, 6)+' '+results.rows.item(0).tin.substring(6, 10)).css({"left":"465px","letter-spacing":"17px"});
								}




								

								$('#p7name').html(results.rows.item(0).name);


								if(results.rows.item(0).etin!="")
								{
									$('#p7tin').html(results.rows.item(0).etin).css({"left":"467px","letter-spacing":"16px"});	
								}
								else
								{
									// alert(results.rows.item(0).tin.substring(0, 3)+'-'+results.rows.item(0).tin.substring(3, 6)+'-'+results.rows.item(0).tin.substring(6, 10));
									$('#p7tin').html(results.rows.item(0).tin.substring(0, 3)+' '+results.rows.item(0).tin.substring(3, 6)+' '+results.rows.item(0).tin.substring(6, 10)).css({"left":"465px","letter-spacing":"17px"});
								}




								

								$('#p7bname').html(results.rows.item(0).name);
								

								$('#p7btax-year').html(results.rows.item(0).tax_year);


								if(results.rows.item(0).etin!="")
								{
									$('#p7btin').html(results.rows.item(0).etin).css({"left":"170px","letter-spacing":"14px"});
									$('#p7btintick').html('&#10003;').css("top","950px");
								}
								else
								{
									// alert(results.rows.item(0).tin.substring(0, 3)+'-'+results.rows.item(0).tin.substring(3, 6)+'-'+results.rows.item(0).tin.substring(6, 10));
									$('#p7btin').html(results.rows.item(0).tin.substring(0, 3)+' '+results.rows.item(0).tin.substring(3, 6)+' '+results.rows.item(0).tin.substring(6, 10)).css({"left":"169px","letter-spacing":"15px"});
									$('#p7btintick').html('&#10003;').css("top","971px");
								}

								$('#p7bcircle').html(results.rows.item(0).circle);
								

								$('#p7btax-area').html(results.rows.item(0).tax_area);



								$('#id').val(results.rows.item(0).id);


					});
					

				});
			});
		}


		function remove (i) {
			// alert(i);
			$(".element"+i).remove();
		}


		var address_footer='</form></table>';

		function address_page (id) {

			// body...

			$("#address").css("display","block");
			
			
			db.transaction(function (tx) {




				tx.executeSql('SELECT * FROM tax_payer WHERE id=?', [id], function (tx, results) {
			

				$(".button").html('<a href="javascript:print_address()" class="btn btn-primary">Print Addresses</a> <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-1">Print Details</button><div class="modal fade" id="modal-1" tabindex="-1" role=""><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Enter Tax Year You Want to Print For</h4></div><div class="modal-body"><div class="row"><div class="col-xs-5"><input class="form-control input-md" type="text" id="common_tax_year" name="common_tax_year" placeholder="Tax Year"></div></div></div><p style="font-size:11px;margin-left:15px">*Leave Empty If You Want Tax Year From Database</p><div class="modal-footer"><a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a><a href="javascript:print_details()" class="btn btn-primary">Submit</a></div></div></div></div>');

				 
				  var len = results.rows.length, i;
				  var items = '<table class="table"><form>';
				  
				  for (i = 0; i < len; i++) {
				    // console.log(results.rows.item(i).value);

				    items+='<tr class="element'+id+'"><td>'+	results.rows.item(i).id	+'</td><td>'+	results.rows.item(i).name	+'</td><td>'+ results.rows.item(i).etin +'</td><td>'+ results.rows.item(i).tin +'</td><td>'+ '<input type="hidden" class="list" value="'+id+'"><a href="javascript:remove('+id+')" class="text-danger"><i class="glyphicon glyphicon-remove"></i></a>' +'</td></tr>';


					items+=address_footer;

					$("#address_list").append(items);

				  }



					});
					

			});
		}




		function print_address () {

			// body...
			db.transaction(function (tx) {


				var idlist= $(".list");
				// alert(idlist.length);
				// alert(idlist[0].value);

				$("#address_details").html("");

				for(i=0;i<idlist.length;i++){

				tx.executeSql('SELECT * FROM tax_payer WHERE id=?', [idlist[i].value], function (tx, results) {
			






						// if (results.rows.item(0).company_address=='available')
						// {
						// 	$('#to').html('মেসার্স '+results.rows.item(0).company);
						// 	$('#co').html('প্রপাইটারঃ '+results.rows.item(0).name);
						// }
						// else if( (results.rows.item(0).company_address=='unavailable') && (results.rows.item(0).sex=='female') && (results.rows.item(0).spouse!=""))
						// {
						// 	$('#to').html(results.rows.item(0).name);
						// 	$('#co').html('c/o: '+results.rows.item(0).spouse);
						// }
						// else
						// {
						// 	$('#to').html(results.rows.item(0).name);
						// 	$('#co').html('c/o: '+results.rows.item(0).f_name);
						// }


						


						if (results.rows.item(0).company_address=='available')
						{
							var to='মেসার্স '+results.rows.item(0).company;
						}
						
						else
						{
							var to=results.rows.item(0).name;

						}
						

						if (results.rows.item(0).company_address=='available')
						{
							var co='প্রপাইটারঃ '+results.rows.item(0).name;
						}
						else if( (results.rows.item(0).company_address=='unavailable') && (results.rows.item(0).sex=='female') && (results.rows.item(0).spouse!=""))
						{
							var co='c/o: '+results.rows.item(0).spouse;

						}
						else
						{
							var co='c/o: '+results.rows.item(0).f_name;
						}
					


						


						if(results.rows.item(0).m_address=='current')
						{
							if(results.rows.item(0).c_sfield!="")
							{
								var sfield=results.rows.item(0).c_sfield;
							}

							else
								sfield="";

						
							if(results.rows.item(0).c_holding!="")
							{
								var holding='হোল্ডিংঃ '+results.rows.item(0).c_holding;
							}


							else
								holding="";
						
							if(results.rows.item(0).c_road!="")
							{
								var road='সড়ক নং / নামঃ '+results.rows.item(0).c_road;
							}

							else
								road="";
				
						
							if(results.rows.item(0).c_village!="")
							{
								var village='মহল্লা / গ্রামঃ '+results.rows.item(0).c_village;
							}


							else
								village="";
						
							if(results.rows.item(0).c_post!="")
							{
								var post='ডাকঘরঃ '+results.rows.item(0).c_post;
							}


							else
								post="";
						
							if(results.rows.item(0).c_upazila!="")
							{
								var upazila='উপজিলাঃ '+results.rows.item(0).c_upazila;
							}

							else
								upazila="";
				
						
							if(results.rows.item(0).c_district!="")
							{
								var district='জিলাঃ '+results.rows.item(0).c_district;
							}

							else
								district="";

						}

						else
						{
							if(results.rows.item(0).p_sfield!="")
							{
								var sfield=results.rows.item(0).p_sfield;
							}

							
							else
								sfield="";

							if(results.rows.item(0).p_holding!="")
							{
								var holding='হোল্ডিংঃ '+results.rows.item(0).p_holding;
							}

							else
								holding="";
				
							if(results.rows.item(0).p_road!="")
							{
								var road='সড়ক নং / নামঃ '+results.rows.item(0).p_road;
							}

							else
								road="";
						
							if(results.rows.item(0).p_village!="")
							{
								var village='মহল্লা / গ্রামঃ '+results.rows.item(0).p_village;
							}

							else
								village="";
						
							if(results.rows.item(0).p_post!="")
							{
								var post='ডাকঘরঃ '+results.rows.item(0).p_post;
							}

							else
								post="";
						
							if(results.rows.item(0).p_upazila!="")
							{
								var upazila='উপজিলাঃ '+results.rows.item(0).p_upazila;
							}

							else
								upazila="";
				
						
							if(results.rows.item(0).p_district!="")
							{
								var district='জিলাঃ '+results.rows.item(0).p_district;
							}

							else
								district="";

						}		


						$('#id').val(results.rows.item(0).id);



						var addblock= '<div class="col-xs-6 address"><div id="to">'+to+'</div><div id="co">'+co+'</div><div id="sfield">'+sfield+'</div><div id="holding">'+holding+'</div><div id="road">'+road+'</div><div id="village">'+village+'</div><div id="post">'+post+'</div><div id="upazila">'+upazila+'</div><div id="district">'+district+'</div></div>';

						
						$("#address_details").append(addblock);
						


						// var addTab='<div class="col-xs-6 address1">
						// 	<div id="to">'+to+'</div>
						// 	<div id="co">'+ co +'</div>
						// 	<div id="sfield">'+vd+'</div>
						// 	<div id="holding">'+vd+'</div>
						// 	<div id="road">dfdfd</div>
						// 	<div id="village">fdfdfd</div>
						// 	<div id="post">dfdfd</div>
						// 	<div id="upazila">fdfdfd</div>
						// 	<div id="district">fgfgf</div>
						// </div>';

						// $("#details").append(addTab);

					});
				}	
					$("#address_details").css({"width":"210mm","height":"297mm"});

					window.print();
			});
		}



		function print_details () {

			// body...
			db.transaction(function (tx) {

				var idlist= $(".list");


				$("#details").html("");

				for(i=0;i<idlist.length;i++){

				tx.executeSql('SELECT * FROM tax_payer WHERE id=?', [idlist[i].value], function (tx, results) {
			


						
								var name=results.rows.item(0).name;


								var nid=results.rows.item(0).nid;


								var etin=results.rows.item(0).etin;

					
								var first3=results.rows.item(0).tin.substring(0, 3);

					// alert(results.rows.item(0).tin.substring(3, 6));
								var second3=results.rows.item(0).tin.substring(3, 6);

					
								var last4=results.rows.item(0).tin.substring(6, 10);

					
						
								var circle=results.rows.item(0).circle;

					
						
								var tax_area=results.rows.item(0).tax_area;

								var value=$('#common_tax_year').value;
								alert(value); 

								
								if($('#common_tax_year').val()!="")
								{
									var tax_year=$('#common_tax_year').val();
									alert("#common_tax_year".value);
								}

								else
								{
									var tax_year=results.rows.item(0).tax_year;
									alert('Tax year is Empty');
								}

								// var tax_year=results.rows.item(0).tax_year;

								
								// $('#sex').val(results.rows.item(0).sex);



								if(results.rows.item(0).residency=='নিবাসী')
								{
								 	var nibashi='&#10003;';
								 	var onibashi='';
								//alert(results.rows.item(0).residency);
								}
								else
								{ 
									var onibashi='&#10003;';
									var nibashi='';
								}

								//alert(results.rows.item(0).status);
								 if(results.rows.item(0).status=='ব্যক্তি')
								 {
								 	var bekti='&#10003;';
								 	var firm='';
								 	var bekti_shongho='';
								 	var hindu_poribar='';
								
								 }

								 else if(results.rows.item(0).status=='ফার্ম')
								 {
								 	var firm='&#10003;';
								 	var bekti='';
								 	var bekti_shongho='';
								 	var hindu_poribar='';
								
								 }

								 else if(results.rows.item(0).status=='ব্যক্তি সংঘ')
								 {
								 	var bekti_shongho='&#10003;';
								 	var firm='';
								 	var bekti='';
								 	var hindu_poribar='';
								
								 }

								 else
								 {
								 	var hindu_poribar='&#10003;';
								 	var firm='';
								 	var bekti='';
								 	var bekti_shongho='';
								
								 }

					
							
								var company=results.rows.item(0).company;

					
							// alert(results.rows.item(0).sex);
							// alert(results.rows.item(0).spouse);

								var spouse=results.rows.item(0).spouse;

					
							
								var f_name=results.rows.item(0).f_name;

					
							
								var m_name=results.rows.item(0).m_name;

					
							
								var birthday=results.rows.item(0).birthday;

					
							
								if(results.rows.item(0).c_sfield!="")
								{
									var c_sfield=results.rows.item(0).c_sfield;
								}
								else
								{
									$('#c_sfield').css("padding-right","0");
									var c_sfield="";
								}

					
							
								if(results.rows.item(0).c_holding!="")
								{
									var c_holding='হোল্ডিংঃ '+results.rows.item(0).c_holding;
								}
								else
								{
									$('#c_holding').css("padding-right","0");
									var c_holding="";
								}

					
							
								if(results.rows.item(0).c_road!="")
								{
									var c_road='সড়ক নং / নামঃ '+results.rows.item(0).c_road;
								}
								else
								{
									$('#c_road').css("padding-right","0");
									var c_road="";
								}

					
							
								if(results.rows.item(0).c_village!="")
								{
									var c_village='মহল্লা / গ্রামঃ '+results.rows.item(0).c_village;
								}
								else
								{
									$('#c_village').css("padding-right","0");
									var c_village="";
								}

					
							
								if(results.rows.item(0).c_post!="")
								{
									var c_post='ডাকঘরঃ '+results.rows.item(0).c_post;
								}
								else
								{
									$('#c_post').css("padding-right","0");
									var c_post="";
								}

					
							
								if(results.rows.item(0).c_upazila!="")
								{
									var c_upazila='উপজিলাঃ '+results.rows.item(0).c_upazila;
								}
								else
								{
									$('#c_upazila').css("padding-right","0");
									var c_upazila="";
								}

					
							
								if(results.rows.item(0).c_district!="")
								{
									var c_district='জিলাঃ '+results.rows.item(0).c_district;
								}
								else
								{
									$('#c_district').css("padding-right","0");
									var c_district="";
								}

					 
							// alert(results.rows.item(0).cp_address);
								if(results.rows.item(0).cp_address=="same")
								{
									$('#p_address').css("padding-left","225px");
									var p_address='ঐ';
									var p_sfield="";
									var p_holding="";
									var p_road="";
									var p_village="";
									var p_post="";
									var p_upazila="";
									var p_district="";
								}
								else
								{
									var p_address='';
									if(results.rows.item(0).p_sfield!="")
									{
										var p_sfield=results.rows.item(0).p_sfield;
									}
									else
									{
										$('#p_sfield').css("padding-right","0");
										var p_sfield="";
									}
									

									if(results.rows.item(0).p_holding!="")
									{
										var p_holding='হোল্ডিংঃ '+results.rows.item(0).p_holding;
									}
									else
									{
										$('#p_holding').css("padding-right","0");
										var p_holding="";
									}

						
									if(results.rows.item(0).p_road!="")
									{
										var p_road='সড়ক নং / নামঃ '+results.rows.item(0).p_road;
									}
									else
									{
										$('#p_road').css("padding-right","0");
										var p_road="";
									}
						
								
									if(results.rows.item(0).p_village!="")
									{
										var p_village='মহল্লা / গ্রামঃ '+results.rows.item(0).p_village;
									}
									else
									{
										$('#p_village').css("padding-right","0");
										var p_village="";
									}
						
								
									if(results.rows.item(0).p_post!="")
									{
										var p_post='ডাকঘরঃ '+results.rows.item(0).p_post;
									}
									else
									{
										$('#p_post').css("padding-right","0");
										var p_post="";
									}
						
								
									if(results.rows.item(0).p_upazila!="")
									{
										var p_upazila='উপজিলাঃ '+results.rows.item(0).p_upazila;
									}
									else
									{
										$('#p_upazila').css("padding-right","0");
										var p_upazila="";
									}

						
								
									if(results.rows.item(0).p_district!="")
									{
										var p_district='জিলাঃ '+results.rows.item(0).p_district;
									}
									else
									{
										$('#p_district').css("padding-right","0");
										var p_district="";
									}
								}

					
							
								var phone=results.rows.item(0).phone;

					
							
								var vat_num=results.rows.item(0).vat_num;


								var iyedate='30-6-'+results.rows.item(0).tax_year.substring(0, 4);


								var p2name=results.rows.item(0).name;


								if( (results.rows.item(0).sex=='female') && (results.rows.item(0).spouse!="") )
								{
									var guardian=results.rows.item(0).spouse;
									$('#p2guardiantick').css("left","455px");
									var p2guardiantick='&#10003;';
								}
								else
								{
									var guardian=results.rows.item(0).f_name;
									$('#p2guardiantick').css("left","430px");
									var p2guardiantick='&#10003;';
								}



								if(results.rows.item(0).etin!="")
								{
									var p2tin=results.rows.item(0).etin;
									var p2tintick='&#10003;';
									$("#p2tintick").css("left","120px");

								}
								else
								{
									// alert(results.rows.item(0).tin.substring(0, 3)+'-'+results.rows.item(0).tin.substring(3, 6)+'-'+results.rows.item(0).tin.substring(6, 10));
									var p2tin=results.rows.item(0).tin.substring(0, 3)+'-'+results.rows.item(0).tin.substring(3, 6)+'-'+results.rows.item(0).tin.substring(6, 10);
									// $('#p2tintick').css("left","180px");
									var p2tintick='&#10003;';
									$('#p2tintick').css("left","180px");
								}


								

								var p3name=results.rows.item(0).name;


								if(results.rows.item(0).etin!="")
								{
									$('#p3tin').css({"left":"465px","letter-spacing":"16px"});
									var p3tin=results.rows.item(0).etin;
								}
								else
								{
									// alert(results.rows.item(0).tin.substring(0, 3)+'-'+results.rows.item(0).tin.substring(3, 6)+'-'+results.rows.item(0).tin.substring(6, 10));
									$('#p3tin').css({"left":"463px","letter-spacing":"17px"});
									var p3tin=results.rows.item(0).tin.substring(0, 3)+' '+results.rows.item(0).tin.substring(3, 6)+' '+results.rows.item(0).tin.substring(6, 10);
								}



								

								var p5name=results.rows.item(0).name;


								if(results.rows.item(0).etin!="")
								{
									
									var p5tin=results.rows.item(0).etin;
									$("#p5tin").css({"left":"467px","letter-spacing":"16px"});
								}
								else
								{
									// alert(results.rows.item(0).tin.substring(0, 3)+'-'+results.rows.item(0).tin.substring(3, 6)+'-'+results.rows.item(0).tin.substring(6, 10));
									
									var p5tin=results.rows.item(0).tin.substring(0, 3)+' '+results.rows.item(0).tin.substring(3, 6)+' '+results.rows.item(0).tin.substring(6, 10);
									$('#p5tin').css({"left":"465px","letter-spacing":"17px"});
								}




								

								var p7name=results.rows.item(0).name;


								if(results.rows.item(0).etin!="")
								{
									$('#p7tin').css({"left":"467px","letter-spacing":"16px"});	
									var p7tin=results.rows.item(0).etin;	
								}
								else
								{
									// alert(results.rows.item(0).tin.substring(0, 3)+'-'+results.rows.item(0).tin.substring(3, 6)+'-'+results.rows.item(0).tin.substring(6, 10));
									$('#p7tin').css({"left":"465px","letter-spacing":"17px"});
									var p7tin=results.rows.item(0).tin.substring(0, 3)+' '+results.rows.item(0).tin.substring(3, 6)+' '+results.rows.item(0).tin.substring(6, 10);
								}




								

								var p7bname=results.rows.item(0).name;
								

								var p7btax_year=results.rows.item(0).tax_year;


								if(results.rows.item(0).etin!="")
								{
									$('#p7btin').css({"left":"170px","letter-spacing":"14px"});
									var p7btin=results.rows.item(0).etin;
									var p7btintick='&#10003;';
									$('#p7btintick').css("top","950px");
								}
								else
								{
									// alert(results.rows.item(0).tin.substring(0, 3)+'-'+results.rows.item(0).tin.substring(3, 6)+'-'+results.rows.item(0).tin.substring(6, 10));
									$('#p7btin').css({"left":"169px","letter-spacing":"15px"});
									var p7btin=results.rows.item(0).tin.substring(0, 3)+' '+results.rows.item(0).tin.substring(3, 6)+' '+results.rows.item(0).tin.substring(6, 10);
									$('#p7btintick').css("top","971px");
									var p7btintick='&#10003;';
								}

								var p7bcircle = results.rows.item(0).circle;
								

								var p7btax_area = results.rows.item(0).tax_area;



								$('#id').val(results.rows.item(0).id);


					var adddetails= '	<div class="page-1"><div class=""><div class=""><img src="images/p1_1.png" alt=""><img class="p1_part2" src="images/p1_2.png" alt=""><div id="P1name">'+name+'</div><div id="P1nid">'+nid+'</div><div id="P1etin">'+etin+'</div><div id="P1tin"><span id="first3">'+first3+'</span><span id="second3">'+second3+'</span><span id="last4">'+last4+'</span></div><div id="P1circle">'+circle+'</div><div id="P1tax_area">'+tax_area+'</div><div id="P1tax_year">'+tax_year+'</div><div id="nibashi">'+nibashi+'</div><div id="onibashi">'+onibashi+'</div><div id="bekti">'+bekti+'</div><div id="firm">'+firm+'</div><div id="bekti_shongho">'+bekti_shongho+'</div><div id="hindu_poribar">'+hindu_poribar+'</div><div id="P1company">'+company+'</div><div id="P1spouse">'+spouse+'</div><div id="P1f_name">'+f_name+'</div><div id="P1m_name">'+m_name+'</div><div id="P1birthday">'+birthday+'</div><div id="c_address"><span id="c_sfield">'+c_sfield+'</span><span id="c_holding">'+c_holding+'</span><span id="c_road">'+c_road+'</span><span id="c_village">'+c_village+'</span><span id="c_post">'+c_post+'</span><span id="c_upazila">'+c_upazila+'</span><span id="c_district">'+c_district+'</span></div><div id="p_address">'+p_address+'<span id="p_sfield">'+p_sfield+'</span><span id="p_holding">'+p_holding+'</span><span id="p_road">'+p_road+'</span><span id="p_village">'+p_village+'</span><span id="p_post">'+p_post+'</span><span id="p_upazila">'+p_upazila+'</span><span id="p_district">'+p_district+'</span></div><div id="P1phone">'+phone+'</div><div id="P1vat_num">'+vat_num+'</div><input type="hidden" id="id"></div></div></div><div class="page-2"><div class=""><div class=""><img src="images/p2_1.png" alt=""><img class="" src="images/p2_2.png" alt=""><div id="iyedate">'+iyedate+'</div><div id="p2name">'+p2name+'</div><div id="guardian">'+guardian+'</div><div id="p2guardiantick">'+p2guardiantick+'</div><div id="p2tin">'+p2tin+'</div><div id="p2tintick">'+p2tintick+'</div></div></div></div><div class="page-3"><div class=""><div class=""><img src="images/p3_1.png" alt=""><img class="p3_part2" src="images/p3_2.png" alt=""><div id="p3name">'+p3name+'</div><div id="p3tin">'+p3tin+'</div></div></div></div><div class="page-4"><div class=""><div class=""><img src="images/p4_1.png" alt=""><img class="" src="images/p4_2.png" alt=""><div class=""></div></div></div></div><div class="page-5"><div class=""><div class=""><img src="images/p5_1.png" alt=""><img class="" src="images/p5_2.png" alt=""><div id="p5name">'+p5name+'</div><div id="p5tin">'+p5tin+'</div></div></div></div><div class="page-6"><div class=""><div class=""><img src="images/p6_1.png" alt=""><img class="" src="images/p6_2.png" alt=""><img class="" src="images/p6_3.png" alt=""><div class=""></div></div></div></div><div class="page-7"><div class=""><div class=""><img src="images/p7_1.png" alt=""><div id="p7name">'+p7name+'</div><div id="p7tin">'+p7tin+'</div><img class="" src="images/p7_2.png" alt=""><div id="p7bname">'+p7bname+'</div><div id="p7btax-year">'+p7btax_year+'</div><div id="p7btin">'+p7btin+'</div><div id="p7btintick">'+p7btintick+'</div><div id="p7bcircle">'+p7bcircle+'</div><div id="p7bcircledot">....</div><div id="p7btax-area">'+p7btax_area+'</div></div></div></div><div class="page-8"><div class=""><div class=""><img src="images/p8_1.png" alt=""><img class="p8_part2" src="images/p8_2.png" alt=""><div class=""></div></div></div></div>';

						
						$("#details").append(adddetails);


						if(results.rows.item(0).c_sfield!="")
						{
							
						}
						else
						{
							$('#c_sfield').css("padding-right","0");

						}

			
					
						if(results.rows.item(0).c_holding!="")
						{
							
						}
						else
						{
							$('#c_holding').css("padding-right","0");
							
						}

			
					
						if(results.rows.item(0).c_road!="")
						{
							
						}
						else
						{
							$('#c_road').css("padding-right","0");
							
						}

			
					
						if(results.rows.item(0).c_village!="")
						{
							
						}
						else
						{
							$('#c_village').css("padding-right","0");
							
						}

			
					
						if(results.rows.item(0).c_post!="")
						{
							
						}
						else
						{
							$('#c_post').css("padding-right","0");
							
						}

			
					
						if(results.rows.item(0).c_upazila!="")
						{
							
						}
						else
						{
							$('#c_upazila').css("padding-right","0");
							
						}

			
					
						if(results.rows.item(0).c_district!="")
						{
							
						}
						else
						{
							$('#c_district').css("padding-right","0");
						
						}

			 
					// alert(results.rows.item(0).cp_address);
						if(results.rows.item(0).cp_address=="same")
						{
							$('#p_address').css("padding-left","225px");
							
						}
						else
						{
							$('#p_address').css("padding-left","0");
							if(results.rows.item(0).p_sfield!="")
							{
								
							}
							else
							{
								$('#p_sfield').css("padding-right","0");
								
							}
							

							if(results.rows.item(0).p_holding!="")
							{
								
							}
							else
							{
								$('#p_holding').css("padding-right","0");
								
							}

				
							if(results.rows.item(0).p_road!="")
							{
								
							}
							else
							{
								$('#p_road').css("padding-right","0");
								
							}
				
						
							if(results.rows.item(0).p_village!="")
							{
								
							}
							else
							{
								$('#p_village').css("padding-right","0");
								
							}
				
						
							if(results.rows.item(0).p_post!="")
							{
								
							}
							else
							{
								$('#p_post').css("padding-right","0");
								
							}
				
						
							if(results.rows.item(0).p_upazila!="")
							{
								
							}
							else
							{
								$('#p_upazila').css("padding-right","0");
								
							}

				
						
							if(results.rows.item(0).p_district!="")
							{
								
							}
							else
							{
								$('#p_district').css("padding-right","0");
								
							}
						}

							
						
						if( (results.rows.item(0).sex=='female') && (results.rows.item(0).spouse!="") )
						{
							$('#p2guardiantick').css("left","455px");
						}
						else
						{
							$('#p2guardiantick').css("left","430px");
						}

						
						if(results.rows.item(0).etin!="")
						{
							// $("#p2tintick").css("left","120px");
							$("#p2tintick:eq("+i+")").addClass("p2tintick");

						}
						else
						{
							// alert(results.rows.item(0).tin.substring(0, 3)+'-'+results.rows.item(0).tin.substring(3, 6)+'-'+results.rows.item(0).tin.substring(6, 10));
							
							// $('#p2tintick').css("left","180px");
							$("#p2tintick:eq("+i+")").addClass("p2tintickelse");
						}
					

				});

 				}
			});
 			window.print();
		}





		function edit_form (id,msg) {
			// body...
			$("#confirmation").html(msg);
			db.transaction(function (tx) {
				tx.executeSql('SELECT * FROM tax_payer WHERE id=?', [id], function (tx, results) {


					$("#dynamic_container").load("edit_income_tax.html",function(){

						
						
								$('#name').val(results.rows.item(0).name);

					
						
								$('#id-card').val(results.rows.item(0).nid);

					
						
								$('#etin').val(results.rows.item(0).etin);

					
						
								$('#tin').val(results.rows.item(0).tin);

					
						
								$('#circle').val(results.rows.item(0).circle);

					
						
								$('#tax-area').val(results.rows.item(0).tax_area);

					
						
								$('#tax-year').val(results.rows.item(0).tax_year);

					
						
								$('#sex').val(results.rows.item(0).sex);
								


								$('#residency').val(results.rows.item(0).residency);

					
						
								$('#status').val(results.rows.item(0).status);

					
							
								$('#company').val(results.rows.item(0).company);

					
							
								$('#company_address').val(results.rows.item(0).company_address);

					
							
								$('#spouse').val(results.rows.item(0).spouse);

					
							
								$('#f_name').val(results.rows.item(0).f_name);

					
							
								$('#m_name').val(results.rows.item(0).m_name);

					
							
								$('#birthday').val(results.rows.item(0).birthday);

					
							
								$('#c_sfield').val(results.rows.item(0).c_sfield);

					
							
								$('#c_holding').val(results.rows.item(0).c_holding);

					
							
								$('#c_road').val(results.rows.item(0).c_road);


					
							
								$('#c_village').val(results.rows.item(0).c_village);

					
							
								$('#c_post').val(results.rows.item(0).c_post);


					
							
								$('#c_upazila').val(results.rows.item(0).c_upazila);

					
							
								$('#c_district').val(results.rows.item(0).c_district);

					
							
								$('#cp_address').val(results.rows.item(0).cp_address);


					
							
								$('#p_sfield').val(results.rows.item(0).p_sfield);


					
							
								$('#p_holding').val(results.rows.item(0).p_holding);

					
							
								$('#p_road').val(results.rows.item(0).p_road);


					
							
								$('#p_village').val(results.rows.item(0).p_village);

					
							
								$('#p_post').val(results.rows.item(0).p_post);


					
							
								$('#p_upazila').val(results.rows.item(0).p_upazila);

					
							
								$('#p_district').val(results.rows.item(0).p_district);

					
							
								$('#m_address').val(results.rows.item(0).m_address);

					
							
								$('#phone').val(results.rows.item(0).phone);

					
							
								$('#vat_num').val(results.rows.item(0).vat_num);



								$('#date').val(results.rows.item(0).date);

								
								$('#id').val(results.rows.item(0).id);



					});
					

				});
			});
		}


		function edit_entry () {

			// body...
			db.transaction(function (txy) {

				var value_list=[$('#name').val(),$('#id-card').val(),$('#etin').val(),$('#tin').val(),$('#circle').val(),$('#tax-area').val(),$('#tax-year').val(),$('#sex').val(),$('#residency').val(),$('#status').val(),$('#company').val(),$('#company_address').val(),$('#spouse').val(),$('#f_name').val(),$('#m_name').val(),$('#birthday').val(),$('#c_sfield').val(),$('#c_holding').val(),$('#c_road').val(),$('#c_village').val(),$('#c_post').val(),$('#c_upazila').val(),$('#c_district').val(),$('#cp_address').val(),$('#p_sfield').val(),$('#p_holding').val(),$('#p_road').val(),$('#p_village').val(),$('#p_post').val(),$('#p_upazila').val(),$('#p_district').val(),$('#m_address').val(),$('#phone').val(),$('#vat_num').val(),$('#date').val(),$('#id').val()];
			
			 txy.executeSql("UPDATE tax_payer SET name=?, nid=?, etin=?, tin=?, circle=?, tax_area=?, tax_year=?, sex=?, residency=?, status=?, company=?, company_address=?, spouse=?, f_name=?, m_name=?, birthday=?, c_sfield=?, c_holding=?, c_road=?, c_village=?, c_post=?, c_upazila=?, c_district=?, cp_address=?, p_sfield=?, p_holding=?, p_road=?, p_village=?, p_post=?, p_upazila=?, p_district=?, m_address=?, phone=?, vat_num=?, date=? WHERE ID=?", value_list,
			        //$("#confirmation").html("Successfully updated");
			       // alert(10);
			        edit_form ($('#id').val(),"Successfully updated"));
			    });
		}



		function gsearch (argument) {
			//alert("list called");
			// body...
			db.transaction(function (txx) {
				//create_tax_table();
				txx.executeSql('SELECT * FROM tax_payer WHERE id LIKE ? OR name LIKE ? OR etin LIKE ? OR tin LIKE ?', ["%"+$('#search').val()+"%","%"+$('#search').val()+"%","%"+$('#search').val()+"%","%"+$('#search').val()+"%"], function (txx, results) { 
					//alert(results.rows.length);
				  var len = results.rows.length, i;
				  var items=header;
				  for (i = 0; i < len; i++) {
				    // console.log(results.rows.item(i).value);


				    items+='<tr><td>'+	results.rows.item(i).id	+'</td><td>'+	results.rows.item(i).name	+'</td><td>'+ results.rows.item(i).etin +'</td><td>'+ results.rows.item(i).tin +'</td><td><table class="table"><tr><td style="border-top:0;"><a href="javascript:details_page('+results.rows.item(i).id+')" class="btn btn-primary">Details</a></td><td style="border-top:0;"><a href="javascript:edit_form('+results.rows.item(i).id+',\'Edit Entry\')" class="btn btn-primary">Edit</a></td><td style="border-top:0;"><a href="javascript:delete_entry('+results.rows.item(i).id+')" class="btn btn-primary">Delete</a></td><td style="border-top:0;"><a href="" class="btn btn-primary">Get App Form</a></td><td style="border-top:0;"><a href="" class="btn btn-primary">Send Address</a></td></tr></table></td></tr>';



				  }

				  items+=footer;

				 
			
				  $("#dynamic_container").html(items);
				  
				  // console.log(results);
				});
			});
		}

		function formValidation (argument) {//return false;
			// body...
			var flag1=true;
			// var flag2=true;


			var rifields = $(".required");
			var onerifields = $(".onerequired");
			var adrsrifields = $(".adrsrequired");
			//alert(rifields.length);
			for (var i = 0; i <rifields.length; i++) {
				//alert($(rifields[i]).val());
				
				if($(rifields[i]).val()=="")
				{
					$(rifields[i]).next().html("Value Required!!").css("color","red");
					flag1=false;
					
				}
				
			}
			
			var flag2=false;
			
			for (var i = 0; i <onerifields.length; i++) {
				//alert($(rifields[i]).val());
				
				if($(onerifields[i]).val()!=="")
				{
					
					flag2=true;
				}
				
			}
			if(flag2==false){$(onerifields[0]).next().html("Etin or Tin Both Can't be Empty!!").css("color","red");}


			var flag3=false;
			
			for (var i = 0; i <adrsrifields.length; i++) {
				//alert($(rifields[i]).val());
				
				if($(adrsrifields[i]).val()!=="")
				{
					
					flag3=true;
				}
				
			}
			if(flag3==false){$(adrsrifields[0]).next().html("All Address Field Can't be Empty!!").css("color","red");}
			
			return (flag1&&flag2&&flag3);
		}


		function backupDb (argument) {
			// $("#confirmation").html(msg);
			// body...
						db.transaction(function (txx) {
				
				txx.executeSql('SELECT * FROM tax_payer', [], function (txx, results) { 

				var len = results.rows.length, i;
				 var datastr="";
				  for (i = 0; i < len; i++) {
				    // console.log(results.rows.item(i).value);

				   if(i==0) datastr+="(\""+results.rows.item(i).name+"\","+"\""+results.rows.item(i).nid+"\","+"\""+results.rows.item(i).etin+"\","+"\""+results.rows.item(i).tin+"\","+"\""+results.rows.item(i).circle+"\","+"\""+results.rows.item(i).tax_area+"\","+"\""+results.rows.item(i).tax_year+"\","+"\""+results.rows.item(i).sex+"\","+"\""+results.rows.item(i).residency+"\","+"\""+results.rows.item(i).status+"\","+"\""+results.rows.item(i).company+"\","+"\""+results.rows.item(i).company_address+"\","+"\""+results.rows.item(i).spouse+"\","+"\""+results.rows.item(i).f_name+"\","+"\""+results.rows.item(i).m_name+"\","+"\""+results.rows.item(i).birthday+"\","+"\""+results.rows.item(i).c_sfield+"\","+"\""+results.rows.item(i).c_holding+"\","+"\""+results.rows.item(i).c_road+"\","+"\""+results.rows.item(i).c_village+"\","+"\""+results.rows.item(i).c_post+"\","+"\""+results.rows.item(i).c_upazila+"\","+"\""+results.rows.item(i).c_district+"\","+"\""+results.rows.item(i).cp_address+"\","+"\""+results.rows.item(i).p_sfield+"\","+"\""+results.rows.item(i).p_holding+"\","+"\""+results.rows.item(i).p_road+"\","+"\""+results.rows.item(i).p_village+"\","+"\""+results.rows.item(i).p_post+"\","+"\""+results.rows.item(i).p_upazila+"\","+"\""+results.rows.item(i).p_district+"\","+"\""+results.rows.item(i).m_address+"\","+"\""+results.rows.item(i).phone+"\","+"\""+results.rows.item(i).vat_num+"\","+"\""+results.rows.item(i).date+"\")";
				   else datastr+="~(\""+results.rows.item(i).name+"\","+"\""+results.rows.item(i).nid+"\","+"\""+results.rows.item(i).etin+"\","+"\""+results.rows.item(i).tin+"\","+"\""+results.rows.item(i).circle+"\","+"\""+results.rows.item(i).tax_area+"\","+"\""+results.rows.item(i).tax_year+"\","+"\""+results.rows.item(i).sex+"\","+"\""+results.rows.item(i).residency+"\","+"\""+results.rows.item(i).status+"\","+"\""+results.rows.item(i).company+"\","+"\""+results.rows.item(i).company_address+"\","+"\""+results.rows.item(i).spouse+"\","+"\""+results.rows.item(i).f_name+"\","+"\""+results.rows.item(i).m_name+"\","+"\""+results.rows.item(i).birthday+"\","+"\""+results.rows.item(i).c_sfield+"\","+"\""+results.rows.item(i).c_holding+"\","+"\""+results.rows.item(i).c_road+"\","+"\""+results.rows.item(i).c_village+"\","+"\""+results.rows.item(i).c_post+"\","+"\""+results.rows.item(i).c_upazila+"\","+"\""+results.rows.item(i).c_district+"\","+"\""+results.rows.item(i).cp_address+"\","+"\""+results.rows.item(i).p_sfield+"\","+"\""+results.rows.item(i).p_holding+"\","+"\""+results.rows.item(i).p_road+"\","+"\""+results.rows.item(i).p_village+"\","+"\""+results.rows.item(i).p_post+"\","+"\""+results.rows.item(i).p_upazila+"\","+"\""+results.rows.item(i).p_district+"\","+"\""+results.rows.item(i).m_address+"\","+"\""+results.rows.item(i).phone+"\","+"\""+results.rows.item(i).vat_num+"\","+"\""+results.rows.item(i).date+"\")";
				   // items+='<tr><td>'+	results.rows.item(i).name	+'</td><td>'+ results.rows.item(i).etin +'</td><td><table class="table"><tr><td style="border-top:0;"><a href="" class="btn btn-primary">Details</a></td><td style="border-top:0;"><a href="javascript:edit_form('+results.rows.item(i).id+',\'Edit Entry\')" class="btn btn-primary">Edit</a></td><td style="border-top:0;"><a href="javascript:delete_entry('+results.rows.item(i).id+')" class="btn btn-primary">Delete</a></td></tr></table></td></tr>';



				  }

					
//console.log(results);
					//var fs = require('fs');alert(fs);
					//fs.writeFile("dbbu.txt","Hi Man",function(err){if(err){alert("error")}});
					//download(JSON.stringify(results),"taxDB/dbbu.json","text/json");
					
					download(datastr,"dbbu.txt","text");
//alert(JSON.stringify(results)+results.rows.item(0).name);
				});
			});
		}


		function restoreDb (value_list) {
			// body...
			if(value_list.charAt(0)=='(' && value_list.charAt(value_list.length-1) == ')')
			{



			delete_tax_table();
			create_tax_table();

			db.transaction(function (tx) {

				// var value_list=[$('#name').val(),$('#id-card').val(),$('#etin').val(),$('#tin').val(),$('#circle').val(),$('#tax-area').val(),$('#tax-year').val(),$('#sex').val(),$('#residency').val(),$('#status').val(),$('#company').val(),$('#spouse').val(),$('#f_name').val(),$('#m_name').val(),$('#birthday').val(),$('#c_address').val(),$('#p_address').val(),$('#phone').val(),$('#vat_num').val(),$('#date').val()];
console.log(value_list);
rowsArray  = value_list.split("~");
				for (var i = 0; i < rowsArray.length; i++) {
					//rowsArray[i]

					tx.executeSql('INSERT INTO tax_payer ( name, nid, etin, tin, circle, tax_area, tax_year, sex, residency, status, company, company_address, spouse, f_name, m_name, birthday, c_sfield, c_holding, c_road, c_village, c_post, c_upazila, c_district, cp_address, p_sfield, p_holding, p_road, p_village, p_post, p_upazila, p_district, m_address, phone, vat_num, date) VALUES '+rowsArray[i],[],function() {
						$("#confirmation").html("Data Restore Successful.."+i);
						$("#dynamic_container").html("");
						// edit_form ($('#id').val(),"New Entry Successfully Added..");
						// body...
						// list_tax_payer ("New Entry Successfully Added..");
					});
				}
				});
			}
			else
			{
				alert("Wrong File Format..!!!");
				return;
			}

		}



function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}


   var reader = new FileReader();
reader.onload = function(e) {
    console.log(reader.result);
	restoreDb(reader.result);

}

function startRestore()
{
	var r=confirm("Are you sure Restore Data From Back Up File???");

	if (r==true) 
	{
		$('#the-file-input').trigger('click');


	}
}




// detect a change in a file input with an id of “the-file-input”
$("#the-file-input").change(function() {
    // will log a FileList object, view gifs below
    console.log(this.files[0]);
 		
 		
		input = document.getElementById('the-file-input');
	    if (!input) {
	      alert("Um, couldn't find the fileinput element.");
	    }
	    else if (!input.files) {
	      alert("This browser doesn't seem to support the `files` property of file inputs.");
	    }
	    else if (!input.files[0]) {
	      alert("Please select a file before clicking 'Restore'");               
	    }
	    else {
			reader.readAsText(input.files[0]);
		}

});


