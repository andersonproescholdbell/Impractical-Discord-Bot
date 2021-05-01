require('dotenv').config();

var blacklist = [];

for (var s of process.env.BLACKLIST.split(',')) {
    blacklist.push(s);
}

var emojis = "hash,zero,one,two,three,four,five,six,seven,eight,nine,copyright,registered,U+2002,U+2003,U+2005,bangbang,interrobang,tm,information_source,left_right_arrow,arrow_up_down,arrow_upper_left,arrow_upper_right,arrow_lower_right,arrow_lower_left,leftwards_arrow_with_hook,arrow_right_hook,watch,hourglass,fast_forward,rewind,arrow_double_up,arrow_double_down,alarm_clock,hourglass_flowing_sand,m,black_small_square,white_small_square,arrow_forward,arrow_backward,white_medium_square,black_medium_square,white_medium_small_square,black_medium_small_square,sunny,cloud,telephone,ballot_box_with_check,umbrella,coffee,point_up,relaxed,aries,taurus,gemini,cancer,leo,virgo,libra,scorpius,sagittarius,capricorn,aquarius,pisces,spades,clubs,hearts,diamonds,hotsprings,recycle,wheelchair,anchor,warning,zap,white_circle,black_circle,soccer,baseball,snowman,partly_sunny,ophiuchus,no_entry,church,fountain,golf,boat,tent,fuelpump,scissors,white_check_mark,airplane,envelope,fist,hand,v,pencil2,black_nib,heavy_check_mark,heavy_multiplication_x,sparkles,eight_spoked_asterisk,eight_pointed_black_star,snowflake,sparkle,x,negative_squared_cross_mark,question,grey_question,grey_exclamation,heavy_exclamation_mark,heart,heavy_plus_sign,heavy_minus_sign,heavy_division_sign,arrow_right,curly_loop,arrow_heading_up,arrow_heading_down,arrow_left,arrow_up,arrow_down,black_large_square,white_large_square,star,o,wavy_dash,part_alternation_mark,congratulations,secret,mahjong,black_joker,a,b,o2,parking,ab,cl,cool,free,id,new,ng,ok,sos,up,vs,cn,de,es,fr,gb,it,jp,kr,ru,us,koko,sa,u7121,u6307,u7981,u7a7a,u5408,u6e80,u6709,u6708,u7533,u5272,u55b6,ideograph_advantage,accept,cyclone,foggy,closed_umbrella,night_with_stars,sunrise_over_mountains,sunrise,city_sunset,city_sunrise,rainbow,bridge_at_night,ocean,volcano,milky_way,earth_asia,new_moon,first_quarter_moon,waxing_gibbous_moon,full_moon,crescent_moon,first_quarter_moon_with_face,star2,stars,chestnut,seedling,palm_tree,cactus,tulip,cherry_blossom,rose,hibiscus,sunflower,blossom,corn,ear_of_rice,herb,four_leaf_clover,maple_leaf,fallen_leaf,leaves,mushroom,tomato,eggplant,grapes,melon,watermelon,tangerine,banana,pineapple,apple,green_apple,peach,cherries,strawberry,hamburger,pizza,meat_on_bone,poultry_leg,rice_cracker,rice_ball,rice,curry,ramen,spaghetti,bread,fries,sweet_potato,dango,oden,sushi,fried_shrimp,fish_cake,icecream,shaved_ice,ice_cream,doughnut,cookie,chocolate_bar,candy,lollipop,custard,honey_pot,cake,bento,stew,egg,fork_and_knife,tea,sake,wine_glass,cocktail,tropical_drink,beer,beers,ribbon,gift,birthday,jack_o_lantern,christmas_tree,santa,fireworks,sparkler,balloon,tada,confetti_ball,tanabata_tree,crossed_flags,bamboo,dolls,flags,wind_chime,rice_scene,school_satchel,mortar_board,carousel_horse,ferris_wheel,roller_coaster,fishing_pole_and_fish,microphone,movie_camera,cinema,headphones,art,tophat,circus_tent,ticket,clapper,performing_arts,video_game,dart,slot_machine,8ball,game_die,bowling,flower_playing_cards,musical_note,notes,saxophone,guitar,musical_keyboard,trumpet,violin,musical_score,running_shirt_with_sash,tennis,ski,basketball,checkered_flag,snowboarder,running,surfer,trophy,football,swimmer,house,house_with_garden,office,post_office,hospital,bank,atm,hotel,love_hotel,convenience_store,school,department_store,factory,izakaya_lantern,japanese_castle,european_castle,snail,snake,racehorse,sheep,monkey,chicken,boar,elephant,octopus,shell,bug,ant,bee,beetle,fish,tropical_fish,blowfish,turtle,hatching_chick,baby_chick,hatched_chick,bird,penguin,koala,poodle,camel,dolphin,mouse,cow,tiger,rabbit,cat,dragon_face,whale,horse,monkey_face,dog,pig,frog,hamster,wolf,bear,panda_face,pig_nose,feet,eyes,ear,nose,lips,tongue,point_up_2,point_down,point_left,point_right,facepunch,wave,ok_hand,thumbsup,thumbsdown,clap,open_hands,crown,womans_hat,eyeglasses,necktie,tshirt,jeans,dress,kimono,bikini,womans_clothes,purse,handbag,pouch,shoe,athletic_shoe,high_heel,sandal,boot,footprints,bust_in_silhouette,boy,girl,man,woman,family,couple,cop,dancers,bride_with_veil,person_with_blond_hair,man_with_gua_pi_mao,man_with_turban,older_man,older_woman,baby,construction_worker,princess,japanese_ogre,japanese_goblin,ghost,angel,alien,space_invader,imp,skull,information_desk_person,guardsman,dancer,lipstick,nail_care,massage,haircut,barber,syringe,pill,kiss,love_letter,ring,gem,couplekiss,bouquet,couple_with_heart,wedding,heartbeat,broken_heart,two_hearts,sparkling_heart,heartpulse,cupid,blue_heart,green_heart,yellow_heart,purple_heart,gift_heart,revolving_hearts,heart_decoration,diamond_shape_with_a_dot_inside,bulb,anger,bomb,zzz,boom,sweat_drops,droplet,dash,poop,muscle,dizzy,speech_balloon,white_flower,100,moneybag,currency_exchange,heavy_dollar_sign,credit_card,yen,dollar,money_with_wings,chart,seat,computer,briefcase,minidisc,floppy_disk,cd,dvd,file_folder,open_file_folder,page_with_curl,page_facing_up,date,calendar,card_index,chart_with_upwards_trend,chart_with_downwards_trend,bar_chart,clipboard,pushpin,round_pushpin,paperclip,straight_ruler,triangular_ruler,bookmark_tabs,ledger,notebook,notebook_with_decorative_cover,closed_book,book,green_book,blue_book,orange_book,books,name_badge,scroll,pencil,telephone_receiver,pager,fax,satellite,loudspeaker,mega,outbox_tray,inbox_tray,package,e-mail,incoming_envelope,envelope_with_arrow,mailbox_closed,mailbox,postbox,newspaper,iphone,calling,vibration_mode,mobile_phone_off,signal_strength,camera,video_camera,tv,radio,vhs,arrows_clockwise,loud_sound,battery,electric_plug,mag,mag_right,lock_with_ink_pen,closed_lock_with_key,key,lock,unlock,bell,bookmark,link,radio_button,back,end,on,soon,top,underage,keycap_ten,capital_abcd,abcd,1234,symbols,abc,fire,flashlight,wrench,hammer,nut_and_bolt,knife,gun,crystal_ball,six_pointed_star,beginner,trident,black_square_button,white_square_button,red_circle,large_blue_circle,large_orange_diamond,large_blue_diamond,small_orange_diamond,small_blue_diamond,small_red_triangle,small_red_triangle_down,arrow_up_small,arrow_down_small,clock1,clock2,clock3,clock4,clock5,clock6,clock7,clock8,clock9,clock10,clock11,clock12,mount_fuji,tokyo_tower,statue_of_liberty,japan,moyai,grin,joy,smiley,smile,sweat_smile,satisfied,wink,blush,yum,relieved,heart_eyes,smirk,unamused,sweat,pensive,confounded,kissing_heart,kissing_closed_eyes,stuck_out_tongue_winking_eye,stuck_out_tongue_closed_eyes,disappointed,angry,rage,cry,persevere,triumph,disappointed_relieved,fearful,weary,sleepy,tired_face,sob,cold_sweat,scream,astonished,flushed,dizzy_face,mask,smile_cat,joy_cat,smiley_cat,heart_eyes_cat,smirk_cat,kissing_cat,pouting_cat,crying_cat_face,scream_cat,no_good,ok_woman,bow,see_no_evil,hear_no_evil,speak_no_evil,raising_hand,raised_hands,person_frowning,person_with_pouting_face,pray,rocket,railway_car,bullettrain_side,bullettrain_front,metro,station,bus,busstop,ambulance,fire_engine,police_car,taxi,red_car,blue_car,truck,ship,speedboat,traffic_light,construction,rotating_light,triangular_flag_on_post,door,no_entry_sign,smoking,no_smoking,bike,walking,mens,womens,restroom,baby_symbol,toilet,wc,bath,frowning,customs,ram,sunglasses,rat,cow2,monorail,pig2,do_not_litter,hushed,high_brightness,full_moon_with_face,mouse2,articulated_lorry,sleeping,pear,finnadie,whale2,repeat_one,rage1,rage2,rage3,rage4,waxing_crescent_moon,earth_americas,leopard,expressionless,mountain_cableway,suspension_railway,clock830,neutral_face,deciduous_tree,thought_balloon,minibus,clock1130,hurtrealbad,kissing_smiling_eyes,mailbox_with_mail,clock630,last_quarter_moon_with_face,oncoming_bus,mute,no_mouth,telescope,shipit,helicopter,anguished,tractor,dog2,worried,children_crossing,stuck_out_tongue,vertical_traffic_light,clock430,crocodile,rabbit2,clock230,bowtie,tram,cat2,water_buffalo,trollface,train2,left_luggage,two_men_holding_hands,waning_crescent_moon,oncoming_taxi,earth_africa,microscope,new_moon_with_face,waning_gibbous_moon,innocent,bicyclist,oncoming_police_car,non-potable_water,neckbeard,aerial_tramway,baggage_claim,dromedary_camel,mountain_bicyclist,busts_in_silhouette,train,baby_bottle,rowboat,steam_locomotive,tiger2,fu,lemon,pound,sun_with_face,mailbox_with_no_mail,no_bell,european_post_office,feelsgood,metal,twisted_rightwards_arrows,evergreen_tree,grimacing,no_pedestrians,low_brightness,trolleybus,clock1230,octocat,confused,potable_water,no_mobile_phones,clock930,repeat,rooster,postal_horn,ox,horse_racing,no_bicycles,clock1030,goberserk,bathtub,last_quarter_moon,squirrel,shower,clock730,open_mouth,light_rail,loop,put_litter_in_its_place,euro,clock530,dragon,arrows_counterclockwise,kissing,rugby_football,goat,globe_with_meridians,clock330,mountain_railway,smiling_imp,passport_control,suspect,sound,grinning,oncoming_automobile,two_women_holding_hands,speaker,clock130,godmode";

const fishEmoji = [":fish:", ":tropical_fish:", ":blowfish:", ":fishing_pole_and_fish:"];

const url1 = 'https://insult.mattbas.org/api/insult.txt?template=' + 'Leave the fish alone you <adjective min=2 max=5> <animal> <animal_part>. ';
const url2 = 'https://evilinsult.com/generate_insult.php?lang=en';//&type=json';

module.exports = {
    blacklist: blacklist,
    allEmojis: emojis.split(','),
    fishEmoji: fishEmoji,
    url1: url1,
    url2: url2
}