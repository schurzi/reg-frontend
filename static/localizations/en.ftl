header-dropdown-my-account = My account

header-dropdown-language = Language

header-clock-component-months =
  .caption = Months
header-clock-component-days =
  .caption = Days
header-clock-component-hours =
  .caption = Hours
header-clock-component-minutes =
  .caption = Minutes
header-clock-component-seconds =
  .caption = Seconds

register-navigation-back = Go back

register-navigation-next = Continue

register-navigation-finish = Finish

register-ticket-day-card =
  .label = {DATETIME($date, day: "numeric", month: "long", year: "numeric")}

register-ticket-level-card-standard =
  This Standard Convention ticket grants you access to the convention from Wednesday to Sunday.

  + Standard convention badge
  + program book
  + participation in all scheduled events

  .label = Standard
  .priceLabel = Standard ticket

register-ticket-level-card-sponsor =
  As a thank you for supporting Eurofurence with a voluntary donation, you will receive

  + Sponsor convention badge
  + program book + honorable mention
  + participation in all scheduled events
  + early access to the Dealer's Den on Thursday
  + free T-shirt

  .label = Sponsor
  .priceLabel = Early-bird ticket

register-ticket-level-card-super-sponsor =
  An even more generous donation, you've earned a Super Sponsor ticket! This means you'll get

  + Super Sponsor convention badge
  + program book + honorable mention
  + participation in all scheduled events
  + super-early access to the Dealer's Den on Thursday
  + free T-shirt
  + access to exclusive Super Sponsor events

  .label = Super sponsor
  .priceLabel = Super early-bird ticket

register-ticket-level-expiration-notice = Register before {DATETIME($expirationDate, day: "numeric", month: "long")}

register-ticket-level-addons-title = Select add-ons

register-ticket-level-addons-item-stage-pass =
  .label = Stage pass
  .description = The Stage pass will grant you access to the stage events from **Wednesday** to **Saturday**.

register-ticket-level-addons-item-tshirt =
  .label = Eurofurence T-shirt
  .description = 100% cotton, high-quality T-shirts. You can also purchase these at the event, but purchasing it now will guarantee the availability of your size.

register-ticket-level-addons-item-tshirt-option-size =
  .label = T-shirt size

register-form-nickname =
  .label = Nickname
  .placeholder = Johnny_The_Sergal

register-form-first-name =
  .label = First name
  .placeholder = John

register-form-last-name =
  .label = Last name
  .placeholder = Doe

register-form-full-name-permission =
  .label = I grant permission to use my full name in Eurofurence related media.

register-form-name-on-badge =
  .legend = Name on badge

register-form-name-on-badge-legal-name =
  .label = Legal name

register-form-name-on-badge-nickname =
  .label = Nickname

register-form-name-on-badge-legal-name-and-nickname =
  .label = Legal name + nickname

register-form-gender =
  .legend = Gender

register-form-gender-male =
  .label = { -gender(gender: "male") }

register-form-gender-female =
  .label = { -gender(gender: "female") }

register-form-gender-non-binary =
  .label = { -gender(gender: "non-binary") }

register-form-gender-prefer-not-to-say =
  .label = { -gender(gender: "prefer-not-to-say") }

register-form-accessibility =
  .legend = Accessibility

register-form-accessibility-wheelchair =
  .label = Please accomodate my wheelchair (and me).

register-summary-section-personal-title = Personal information

register-summary-section-personal-property-nickname-name = Nickname
register-summary-section-personal-property-full-name-name = Full name
register-summary-section-personal-property-gender-name = Gender
register-summary-section-personal-property-badge-name-name = You will be known as
register-summary-section-personal-property-spoken-languages-name = Spoken language(s)
register-summary-section-personal-property-wheelchair-accomodation-name = Wheelchair accomodation
register-summary-section-contact-property-email-name = E-mail address
register-summary-section-contact-property-phone-number-name = Phone number
register-summary-section-contact-property-street-name = Street
register-summary-section-contact-property-city-name = City
register-summary-section-contact-property-postal-code-name = Postal code
register-summary-section-contact-property-state-or-province-name = State / Province
register-summary-section-contact-property-country-name = Country
register-summary-section-optional-property-notifications-name = I would like to receive event information and announcements about
register-summary-section-optional-property-comments-name = Comments

register-summary-section-personal-property-wheelchair-accomodation-value = { $value ->
  [true] Yes
 *[false] No
}

register-summary-section-contact-title = Contact information

register-summary-section-optional-title = Optional information

register-summary-edit = Edit information

register-invoice-layout =
  .invoiceTitle = Your registration

register-step-counter = Step {$step}

register-change-ticket-type =
  .label = Change ticket type

hotel-booking-room-card-standard =
  The 27 sqm standard rooms offer luxurious living comfort.
  The rooms are additionally equipped with modern furnishings and spacious working & storage areas so as to best meet guests' needs.

  .label = Standard room

hotel-booking-room-card-deluxe =
  The deluxe rooms at the Estrel Hotel feature an impressive 34 sqm of modern living space.
  The contemporary furnishings and generous work spaces are specially designed to meet the needs of business travellers.

  .label = Deluxe room

hotel-booking-room-card-junior-suite =
  The spacious junior suites (49 to 55 sqm) offer separate living and sleeping areas and feature distinctive styles thanks
  to selected contemporary furnishings, colour accents and works of art.

  .label = Junior suite

hotel-booking-room-card-deluxe-suite =
  Elegantly liveable and fully equipped, the executive suites with their 90 sqm of living space leave nothing to be desired.
  A separate living area with sofas and armchairs, a small bar area and a second TV screen in the bathroom create an upscale,
  welcoming atmosphere almost like home.

  .label = Deluxe suite

price = {$price ->
   [0]     Free
  *[other] {NUMBER($price, minimumFractionDigits: 0)}
}

-gender = { $gender ->
  [male]              Male
  [female]            Female
  [non-binary]        Non-binary
 *[prefer-not-to-say] I prefer not to say
}

gender = { $gender ->
  [male] { -gender(gender: "male") }
  [female] { -gender(gender: "female") }
  [non-binary] { -gender(gender: "non-binary") }
 *[prefer-not-to-say] { -gender(gender: "prefer-not-to-say") }
}

notification-type = { $type ->
  [art]        Art
  [animation]  Animation
  [music]      Music
 *[fursuiting] Fursuiting
}

invoice-total-label = Total
invoice-total-taxesnotice = Taxes included

invoice-item-label = {$amount} x {$name}

invoice-item-definition-register-ticket-type-day =
  .name = Day ticket
  .extra = {DATETIME($day, month: "long", day: "numeric")}

invoice-item-definition-register-ticket-type-full =
  .name = Full conv.
  .extra = {DATETIME_RANGE($start, $end, month: "long", day: "numeric")}

invoice-item-definition-register-ticket-addons-stage-pass =
  .name = Stage pass

invoice-item-definition-register-ticket-addons-tshirt =
  .name = T-shirt
  .extra = {$size}

footer-links-privacy-policy = Privacy policy

footer-links-cookie-statement = Cookie statement

footer-links-contact = Contact Eurofurence

footer-last-saved = Your information was last saved on {DATETIME($lastSaved, weekday: "long", month: "long", day: "numeric", year: "numeric")} at {DATETIME($lastSaved, hour: "numeric", minute: "numeric")}.
