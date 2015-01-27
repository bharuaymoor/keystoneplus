# keystoneplus



##Overview

The project we created for ObjectArray solution is called keystonplus.

Q: Does keystoneplus change keystonejs' source code?

A: No



Q: Do I need copy keystoneplus' source code into my project?

A: No. keystoneplus is a npm package, you just need put it into your package.json file and request "keystoneplus" in your js file.



Q: Does keystoneplus have much code?

A: No.



Q: What is keystoneplus' architecture?

A: We didn't create anything new, we just followed keystonejs' architecture. will explain more later/





##What does the result looks like:

![kseg](http://1.bp.blogspot.com/-bnBp5Wm3nTc/VMYEh0qNc8I/AAAAAAAAVT8/3RWKfmbiw_E/s1600/Snip20150126_1.png) 


##Example:

https://github.com/wangpingsx/keystoneplus_example




##Project structure:

![structure](http://1.bp.blogspot.com/-oNQ2xd5tFuU/VMZbiWS-9TI/AAAAAAAAVUw/GTHfakHblpc/s1600/Snip20150126_7.png)


##The type -- ObjectArray.js

![typefile](http://4.bp.blogspot.com/-ggy6bjucap8/VMbGCOcmpKI/AAAAAAAAVVA/N1JkJWXxGrY/s1600/Snip20150126_1.png)



I just did two things in this file:

1. Specify template files, otherwise keystone will seek those template files in node_models/keystone/templates (this path may not right, but it looks like this.)

2. Convert httpRequest parameters into the right format and wait for storing.


##2000

To understand why I put 2000 here, you should check my template files first.

This is quite tricky,  because I don't know how many sub object does the user create,  so to manage this difficulty I use 2000. I will explain more below:


##The template file

![templatefile](http://2.bp.blogspot.com/-Ays9oY2GvWY/VMbOWtockpI/AAAAAAAAVVQ/4bOhUVzv_3I/s1600/Snip20150126_3.png)



The inital file and form file is quite similar and form file is more complex so I will only explain form file.

When this form file display sub object array, it will assign a sequence number to each sub object, the number will start from 1 and sub objects will have different numbers.

Input's 'name' will be the httpRequest parameter name. So sub objectarray field name + sub object field name + sequence number will make every input has an unique name.

This template file will carelessly assign sequence number to each object. However this template file only support 999 sub-objects in each sub-object array. Why? Please see below:


##ObjectArray.js-- the front-end jQuery code

![jqueryfile](http://4.bp.blogspot.com/-nCiTzqteIW8/VMbRKf_1YiI/AAAAAAAAVVc/zYyxXBwhuvs/s1600/Snip20150126_4.png)


As you know when you click add button, it will create an empty sub-object for you on the GUI. How to make the input's name unique is a challenge, because what we did previously was a jade file, it is a precompile file, it will generate a html file on runtime. It is possible to find out how many sub-objects on this html file when it displaying, but it is difficult. So I found a dirty and simple solution: start the sequence number from 1000. That's why my solution only support 999 sub-objects. because the 1001st sub-object will be override by the new added sub-object. 1002, 1003 ,1004 ..... they have the same issue.


##Back to the template file again

![templateagain](http://2.bp.blogspot.com/-2eer4wwNlq4/VMbUII42aPI/AAAAAAAAVVo/SlUhGvsjf1A/s1600/Snip20150126_5.png)


####Why there is a hidden div here?

The reason is keystonejs' architecture decoupled jQuery code and html (jade) code. the html code doesn't directly call any javascript code when users click add button. jQuery add listener for the button. To continuously implement decoupling and make the solution more abstract and more reusable at the meantime, keystone hard coded the adding html section into the jQuery js file. For textArray and NumberArray is fine.

However, I can't do this. my solution should be really abstract, I can't  hard code sub-object's fields in the jQuery js file.

One possible solution is copying the latest sub-object's fields, but it doesn't work if we are going to create the first sub-object.

So, a hidden div is create for copying.


##Let's discuss 2000 again

As you know we support 999 old sub-object plus 999 new sub-objects, However html is stateless, we don't know how many sub-objects are displaying on the html page. So my another dirty and simple solution is ping from 1 to 2000. That's why we can see this:


![loop2000again](http://4.bp.blogspot.com/-r7f9hInJRQU/VMbY1VabLJI/AAAAAAAAVV0/yldt4m8DKvs/s1600/Snip20150127_6.png)


So you may ask me, usually users just add one or two sub-objects, and you will loop for 2000 that waste 99% of cpu time. My answer is that keystonejs is an CMS, and it is an admin-UI. we should have less users. So this is no big deal.

2000 will be removed next version, so you should have no issue with wasting cpu time.




#Acknowledge:


Massive thanks to M&S for sponsoring this project.


Of cause many thanks to all contributors of Keystonejs!!!!


![M&S](http://asset1.marksandspencer.com/is/image/mands/logo-mns?$CHECKOUT_LOGO$)




######This readme content also posted on my blog:  [Peter's blog](http://baiduhix.blogspot.co.uk/2015/01/a-new-type-of-keystonejs-objectarray_26.html)







