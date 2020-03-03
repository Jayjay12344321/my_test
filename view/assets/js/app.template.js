var __view_student_by_id_content = `
              <div class="view-stud-by-id">
                <div class="add-student-content">
                  <div class="col-sm-12 background-black">
                    <label class="col-sm-5 float-left"><b>First Name</b></label>
                        <input value="{{firstname}}" type="text" style="border:1px solid green;" class="background-white form-control col-sm-7 btn btn-sm float-left save-student-firstname">
                  </div><br><br>
                  <div class="col-sm-12 background-black">
                    <label class="col-sm-5 float-left"><b>Last Name</b></label>
                        <input value="{{lastname}}" type="text" style="border:1px solid green;" class="background-white form-control col-sm-7 btn btn-sm float-left save-student-lastname">
                  </div><br><br>
                  <div class="col-sm-12 background-black">
                    <label class="col-sm-5 float-left"><b>Birth Date</b></label>
                        <input value="{{bod}}" type="date" style="border:1px solid green;" class="background-white form-control col-sm-7 btn btn-sm float-left save-student-bod">
                  </div><br><br>
                  <div class="col-sm-12 background-black">
                    <label class="col-sm-5 float-left"><b>Address</b></label>
                        <input value="{{address}}" type="text" style="border:1px solid green;" class="background-white form-control col-sm-7 btn btn-sm float-left save-student-address">
                  </div><br><br>
                  <div class="col-sm-12 background-black">
                    <label class="col-sm-10 float-left"></label>
                        <button type="submit" class="btn-edit-student col-sm-2 btn btn-primary btn-sm no-border float-left">
                          <i class="fas fa-plus"> Update</i>
                        </button>
                  </div>
                </div>
              </div>
`;


var _edit_customer = `
      <div class="form-group row">
      <input type="hidden" value={{customer_id}} class="form-control customer-firstname" id="customer-customer_id-edit">
          <label for="customer-firstname-edit" class="col-sm-2 col-form-label">Firstname</label>
          <div class="col-sm-10">
              <input type="text" value={{firstname}} class="form-control customer-firstname-edit mdl-customer-edit-el" id="customer-firstname-edit" placeholder="Firstname">
              <small class="custom-error"></small>
          </div>
      </div>
      <div class="form-group row">
          <label for="customer-lastname-edit" class="col-sm-2 col-form-label">Lastname</label>
          <div class="col-sm-10">
              <input type="text" value={{lastname}} class="form-control customer-lastname-edit mdl-customer-edit-el" id="customer-lastname-edit" placeholder="Lastname">
              <small class="custom-error"></small>
          </div>
      </div>
      <div class="form-group row">
          <label for="customer-email-edit" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
              <input type="text" value={{email}} class="form-control customer-email-edit mdl-customer-edit-el" id="customer-email-edit" placeholder="Email">
              <small class="custom-error"></small>
          </div>
      </div>
      <div class="form-group row">
          <label for="customer-phone-no-edit" class="col-sm-2 col-form-label">Phone no.</label>
          <div class="col-sm-10">
              <input type="number" value={{phone_no}} class="form-control customer-phone-no-edit mdl-customer-edit-el" id="customer-phone-no-edit" placeholder="Phone no">
              <small class="custom-error"></small>
          </div>
      </div>
      <div class="form-group row">
          <label for="customer-address-edit" class="col-sm-2 col-form-label">Address</label>
          <div class="col-sm-10">
              <input type="text" value={{address}} class="form-control customer-address-edit mdl-customer-edit-el" id="customer-address-edit" placeholder="Address">
              <small class="custom-error"></small>
          </div>
      </div>
`;

var _edit_supplier = `
      <div class="form-group row">
      <input type="hidden" value={{supplier_id}} class="form-control supplier-supplier_id" id="supplier-supplier_id-edit">
          <label for="supplier-name-edit" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
              <input type="text" value={{name}} class="form-control supplier-name-edit mdl-supplier-edit-el" id="supplier-name-edit" placeholder="Name">
              <small class="custom-error"></small>
          </div>
      </div>
      <div class="form-group row">
          <label for="supplier-email-edit" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
              <input type="text" value={{email}} class="form-control supplier-email-edit mdl-supplier-edit-el" id="supplier-email-edit" placeholder="Email">
              <small class="custom-error"></small>
          </div>
      </div>
      <div class="form-group row">
          <label for="supplier-contact-edit" class="col-sm-2 col-form-label">Contact no.</label>
          <div class="col-sm-10">
              <input type="number" value={{contact}} class="form-control supplier-contact-edit mdl-supplier-edit-el" id="supplier-contact-edit" placeholder="Contact no">
              <small class="custom-error"></small>
          </div>
      </div>
      <div class="form-group row">
          <label for="supplier-address-edit" class="col-sm-2 col-form-label">Address</label>
          <div class="col-sm-10">
              <input type="text" value={{address}} class="form-control supplier-address-edit mdl-supplier-edit-el" id="supplier-address-edit" placeholder="Address">
              <small class="custom-error"></small>
          </div>
      </div>
`;

var _edit_product = `
      <div class="form-group row">
          <input type="hidden" value={{product_id}} class="form-control product-product_id_edit" id="product-product_id-edit">
          <label for="product-category-edit" class="col-sm-3 col-form-label">Category</label>
          <div class="col-sm-9">
              <select class="form-control product-category-edit mdl-product-edit-el" id="product-category">
              </select>
              <small class="custom-error"></small>
          </div>
      </div>
          <div class="form-group row">
          <label for="product-code-edit" class="col-sm-3 col-form-label">Code</label>
          <div class="col-sm-9">
              <input type="text" value={{product_code}} disabled class="form-control product-code-edit" id="product-code-edit" placeholder="Product Code">
              <small class="custom-error"></small>
          </div>
      </div>
      <div class="form-group row">
          <label for="product-name-edit" class="col-sm-3 col-form-label">Name</label>
          <div class="col-sm-9">
              <input type="text" value={{product_name}} class="form-control product-name-edit mdl-product-edit-el" id="product-name-edit" placeholder="Product Name">
              <small class="custom-error"></small>
          </div>
      </div>
      <div class="form-group row">
          <label for="product-description-edit" class="col-sm-3 col-form-label">Description</label>
          <div class="col-sm-9">
              <textarea class="form-control product-description-edit mdl-product-edit-el" id="product-description-edit" placeholder="" rows="3">
                  {{description}}
              </textarea>
              <small class="custom-error"></small>
          </div>
      </div>
      <div class="form-group row">
          <label for="product-quantity-edit" class="col-sm-3 col-form-label">Quantity</label>
          <div class="col-sm-9">
              <input type="number" value={{quatity}} class="form-control product-quantity-edit mdl-product-edit-el" id="product-quantity-edit" placeholder="Quantity">
              <small class="custom-error"></small>
          </div>
      </div>
      <div class="form-group row">
          <label for="product-price-edit" class="col-sm-3 col-form-label">Price</label>
          <div class="col-sm-9">
              <input type="number" value={{supplier_price}} class="form-control product-price-edit mdl-product-edit-el" id="product-price-edit" placeholder="Price">
              <small class="custom-error"></small>
          </div>
      </div>
      <div class="form-group row">
          <label for="product-supplier-edit" class="col-sm-3 col-form-label">Supplier</label>
          <div class="col-sm-9">
              <select class="form-control product-supplier-edit mdl-product-edit-el" id="product-supplier">
              </select>
              <small class="custom-error"></small>
          </div>
      </div>
`;

var _select_option_supplier_template = '<option {{selected}} value="{{value}}">{{name}}</option>';

var _select_option_category_template = '<option {{selected}} value="{{value}}">{{name}}</option>';

var _select_option_product_template  = '<option {{selected}} value="{{value}}">{{name}}</option>';

var _sales_item_template = `
        <tr class="tr-content add-product-sales-items" data-id={{product_id}}>\
            <td width="45%" class="dashed-unerline">{{product_name}}</td>\
            <td width="20%" class="text-center sales-total-quantity">{{quatity}}</td>\
            <td width="10%" class="text-center sales-price">{{supplier_price}}</td>\
            <td width="10%" class="text-center bg-light number-only edit-sales-quantity" data-id={{product_id}} contenteditable="true">0</td>\
            <td width="10%" class="text-center sales-total-price">0</td>\
            <td width="5%"  class="text-center btn-sales-add"><button type="button" data-id={{product_id}} class="btn btn-danger btn-sm btn-sales-delete"><b>x</b></button></td>\
        </tr>
`;