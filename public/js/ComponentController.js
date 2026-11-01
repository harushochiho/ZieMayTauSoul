const html_template = getTemplate();
const html_others = getOthers();
const class_change = getSpecialAdjustment();
let copy_star_flag = false;
const position_id = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戍",
  "亥",
];
const dateType = {
  year: "年",
  month: "月",
  day: "日",
};
const zodiac = ["rat", "ox", "tiger", "rabbit", "dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pig"];

let articles = {};

function CopyStars(section) {
  let real_section = section.replace("_copyStar", "");
  for (let position = 1; position <= 12; position++) {
    if (!$(`#${real_section}_${position}_main`).children(".main").length) {
      if (position < 7) {

        $(`#${real_section}_${position + 6}_main`)
          .children(".main")
          .clone()
          .addClass("main_copy")
          .each((index, value) => {
            let id = `${$(value).prop("id")}_copy`;
            $(value)
              .prop("id", id)
              .appendTo(`#${real_section}_${position}_main`);
            console.log($(value).prop("id") + " " + id);
          });


        $(`#${real_section}_${position + 6}_moon`)
          .children(".moon")
          .clone()
          .addClass("moon_copy")
          .each((index, value) => {
            let id = `${$(value).prop("id")}_copy`;
            $(value)
              .prop("id", id)
              .appendTo(`#${real_section}_${position}_moon`);
          });


        $(`#${real_section}_${position + 6}_moon`)
          .children(".m_moon")
          .clone()
          .addClass("m_moon_copy")
          .each((index, value) => {
            let id = `${$(value).prop("id")}_copy`;
            $(value)
              .prop("id", id)
              .appendTo(`#${real_section}_${position}_moon`);
          });


        $(`#${real_section}_${position + 6}_first_tier`)
          .children(".first_tier")
          .clone()
          .addClass("first_tier_copy")
          .each((index, value) => {
            let id = `${$(value).prop("id")}_copy`;
            $(value)
              .prop("id", id)
              .appendTo(`#${real_section}_${position}_first_tier`);
          });


        $(`#${real_section}_${position + 6}_second_tier`)
          .children(".second_tier")
          .clone()
          .addClass("second_tier_copy")
          .each((index, value) => {
            let id = `${$(value).prop("id")}_copy`;
            $(value)
              .prop("id", id)
              .appendTo(`#${real_section}_${position}_second_tier`);
          });

      } else {

        $(`#${real_section}_${position - 6}_main`)
          .children(".main")
          .clone()
          .addClass("main_copy")
          .each((index, value) => {
            let id = `${$(value).prop("id")}_copy`;
            $(value)
              .prop("id", id)
              .appendTo(`#${real_section}_${position}_main`);
          });

        $(`#${real_section}_${position - 6}_moon`)
          .children(".moon")
          .clone()
          .addClass("moon_copy")
          .each((index, value) => {
            let id = `${$(value).prop("id")}_copy`;
            $(value)
              .prop("id", id)
              .appendTo(`#${real_section}_${position}_moon`);
          });

        $(`#${real_section}_${position - 6}_moon`)
          .children(".m_moon")
          .clone()
          .addClass("m_moon_copy")
          .each((index, value) => {
            let id = `${$(value).prop("id")}_copy`;
            $(value)
              .prop("id", id)
              .appendTo(`#${real_section}_${position}_moon`);
          });

        $(`#${real_section}_${position - 6}_first_tier`)
          .children(".first_tier")
          .clone()
          .addClass("first_tier_copy")
          .each((index, value) => {
            let id = `${$(value).prop("id")}_copy`;
            $(value)
              .prop("id", id)
              .appendTo(`#${real_section}_${position}_first_tier`);
          });

        $(`#${real_section}_${position - 6}_second_tier`)
          .children(".second_tier")
          .clone()
          .addClass("second_tier_copy")
          .each((index, value) => {
            let id = `${$(value).prop("id")}_copy`;
            $(value)
              .prop("id", id)
              .appendTo(`#${real_section}_${position}_second_tier`);
          });
      }
    }
  }
  copy_star_flag = true;
  UpdateBtnStarCopy(section);
}

function ClearStarsCopied(section) {
  let real_section = section.replace("_copyStar", "");
  for (let position = 1; position <= 12; position++) {
    let main_copy = $(`#${real_section}_${position}_main`).children(
      ".main_copy"
    );
    if (main_copy.length) {
      const moon_copy = $(`#${real_section}_${position}_moon`).children(
        ".moon_copy"
      );
      const m_moon_copy = $(`#${real_section}_${position}_moon`).children(
        ".m_moon_copy"
      );
      const first_tier = $(`#${real_section}_${position}_first_tier`).children(
        ".first_tier_copy"
      );
      const second_tier = $(
        `#${real_section}_${position}_second_tier`
      ).children(".second_tier_copy");

      for (const child of main_copy) {
        child.remove();
      }
      for (const child of moon_copy) {
        child.remove();
      }
      for (const child of m_moon_copy) {
        child.remove();
      }
      for (const child of first_tier) {
        child.remove();
      }
      for (const child of second_tier) {
        child.remove();
      }
    }
  }
  copy_star_flag = false;
  UpdateBtnStarCopy(section);
}

function UpdateBtnStarCopy(section) {
  if ($(`#${section}`).text() == "借星") {
    $(`#${section}`).text("取消借星");
    $(`#${section}`).attr("onclick", "ClearStarsCopied(this.id)");
  } else {
    $(`#${section}`).text("借星");
    $(`#${section}`).attr("onclick", "CopyStars(this.id)");
  }
}

function MovingStarsTenYear(section, text) {
  var pattern = /[0-9]+/;
  let timGone_tenYear = text.trim().slice(0, 1);
  let zodiac_tenYear =
    pattern.exec(section) == null ? 0 : pattern.exec(section)[0];
  let real_section = section.replace(/_[0-9]+_character/, "");
  POSTRequestWithJSON(
    `${window.location.origin}/fetchMovingStarsTenYear`, {
      tim_gone: timGone_tenYear,
      zodiac: zodiac_tenYear,
      time_type: "other"
    },
    function (result, status, xhr, indication) {
      if (indication === "success") {
        ClearMovingStars(real_section, "tenYear");
        LocateMovingStar(result, "tenYear", real_section);
      } else if (indication === "fail") {
        console.log("fail", status, xhr, result);
      }
    }
  );
}

function MovingStarFormAppear(component, type) {
  const section = $(component).parents("section").prop("id");
  /*const date = `<option selected>一${dateType[type]}</option><option>數${dateType[type]}</option>`;
    $(`#${section}_movingstars_period`).empty().append(date);*/
  $(`#${section}_movingstars_submit`).attr(
    "onclick",
    `MovingStarsSettle("${section}", "${type}", "${$(component).prop("id")}")`
  );
  $(`#${section}_movingstars_cancel`).attr(
    "onclick",
    `CancelMovingStarsSettle("${section}")`
  );
  $(`#${section}_MovingStarsYear`).prop("disabled", true);
  $(`#${section}_MovingStarsMonth`).prop("disabled", true);
  $(`#${section}_MovingStarsDay`).prop("disabled", true);
  $(`#${section}_moving_year`).val("");
  $(`#${section}_moving_month`).val("");
  $(`#${section}_moving_day`).val("");
  switch (type) {
    case "year":
      $(`#${section}_movingstars_container_year`).show();
      $(`#${section}_movingstars_container_month`).hide();
      $(`#${section}_movingstars_container_day`).hide();
      break;
    case "month":
      $(`#${section}_movingstars_container_year`).show();
      $(`#${section}_movingstars_container_month`).show();
      $(`#${section}_movingstars_container_day`).hide();
      break;
    default:
      $(`#${section}_movingstars_container_year`).show();
      $(`#${section}_movingstars_container_month`).show();
      $(`#${section}_movingstars_container_day`).show();
      break;
  }
  $(`#${section}_movingstars_form`).show();
}

function MovingStarsSettle(section, type, id) {
  /*let moving_day, moving_month, moving_year;
  switch (type) {
    case "year":
      moving_year = $(`#${section}_moving_year`).val().replace(/\s+/g, "");
      break;
    case "month":
      moving_year = $(`#${section}_moving_year`).val().replace(/\s+/g, "");
      moving_month = $(`#${section}_moving_month`).val().replace(/\s+/g, "");
      break;
    default:
      moving_year = $(`#${section}_moving_year`).val().replace(/\s+/g, "");
      moving_month = $(`#${section}_moving_month`).val().replace(/\s+/g, "");
      moving_day = $(`#${section}_moving_day`).val().replace(/\s+/g, "");
      break;
  }*/
  $(`#${section}_movingstars_form`).hide();
  let day = $(`#${section}_moving_day`).val().replace(/\s+/g, ""),
    month = $(`#${section}_moving_month`).val().replace(/\s+/g, ""),
    year = $(`#${section}_moving_year`).val().replace(/\s+/g, ""),
    data = {},
    url = ``,
    interval = "";
  if (type === "day") {
    data["day"] = day;
    data["month"] = month;
    data["year"] = year;
    interval = "other";
    url = `${window.location.origin}/getLunarDay`;
  } else if (type === "month") {
    data["month"] = month;
    data["year"] = year;
    interval = "other";
    url = `${window.location.origin}/getLunarMonth`;
  } else if (type === "year") {
    data["year"] = year;
    interval = "year";
    url = `${window.location.origin}/getLunarYear`;
  }

  POSTRequestWithJSON(url, data, function (result, status, xhr, indication) {
    if (indication === "success") {
      //console.log(sessionStorage.getItem("type_of_people"));
      var pattern = /_/;
      let [timGone, zodiac] = result.split(pattern);
      POSTRequestWithJSON(
        `${window.location.origin}/fetchMovingStarsTenYear`, {
          tim_gone: timGone,
          zodiac: zodiac,
          time_type: interval
          //type_of_people: sessionStorage.getItem("type_of_people"),
        },
        function (result_stars, status_stars, xhr_stars, indication_stars) {
          try {
            if (indication_stars === "success") {
              ClearMovingStars(section, type);
              LocateMovingStar(result_stars, type, section);
            } else if (indication_stars === "fail") {
              console.log("fail", status_stars, xhr_stars, result_stars);
            }
          } catch (e) {
            console.log(e);
          }
          $(`#${section}_MovingStarsYear`).prop("disabled", false);
          $(`#${section}_MovingStarsMonth`).prop("disabled", false);
          $(`#${section}_MovingStarsDay`).prop("disabled", false);
        }
      );
    } else if (indication === "fail") {
      $(`#${section}_MovingStarsYear`).prop("disabled", false);
      $(`#${section}_MovingStarsMonth`).prop("disabled", false);
      $(`#${section}_MovingStarsDay`).prop("disabled", false);
      console.log("fail", status, xhr, result);
    }
  });
}

function CancelMovingStarsSettle(section) {
  $(`#${section}_MovingStarsYear`).prop("disabled", false);
  $(`#${section}_MovingStarsMonth`).prop("disabled", false);
  $(`#${section}_MovingStarsDay`).prop("disabled", false);
  $(`#${section}_movingstars_form`).hide();
}

function LocateMovingStar(result, type, section) {
  for (const star in result) {
    if (result.hasOwnProperty(star)) {
      const single_star = result[star];

      const node_id =
        single_star["metaData"][1] === "changes" ?
        single_star["position"] :
        `${single_star["position"]}_${single_star["metaData"][1]}`;
      let template;
      if (single_star["metaData"][1] === "moon") {
        template = html_template["m_moon"];
      } else if (single_star["metaData"][1] === "second_tier") {
        template = html_template["m_second_tier"];
      } else if (single_star["metaData"][1] === "changes") {
        template = html_template["m_changes"];
      }

      /*
       * Get the id in the parent of main star container and split the id into string array based on "_".
       * Then get the third element from the array.
       * The third element is the position(zodiac).
       */
      let zodiac_position =
        single_star["metaData"][1] === "changes" ?
        $(`#${section}_${single_star["position"]}`)
        .parent()
        .prop("id")
        .split("_")[2] :
        single_star["position"];

      let html_node;
      if (single_star["metaData"][1] === "changes") {
        html_node = `${template["front_begin"]} id="${star}_${section}_${zodiac_position}_${type}"${template["front_end"]}${html_others[type]}${single_star["metaData"][0]}${template["end"]}`;
      } else {
        html_node = `${template["front_begin"]} id="${star}_${section}_${zodiac_position}_${type}"${template["front_end"]}${single_star["metaData"][0]}${html_others[type]}${template["end"]}`;
      }

      $(html_node).appendTo(`#${section}_${node_id}`);

      if (class_change["class_change"].includes(star)) {
        $(`#${star}_${section}_${zodiac_position}_${type}`).addClass(
          "special_moon"
        );
      }

      if (copy_star_flag) {
        let position = 0;
        let is_number_position = typeof (single_star["position"]) === "number";

        if (is_number_position) {
          position = parseInt(single_star["position"]);
        } else {
          let main_pos = $(`#${section}_${single_star["position"]}`).parent().attr("id");
          position = parseInt(main_pos.split("_")[2]);
        }

        let opposite_pos = position < 7 ? (position + 6) : (position - 6);
        if ($(`div#${section}_${opposite_pos}_main > div.main_copy`).length > 0) {
          if (is_number_position) {

            const elem_id = `${star}_${section}_${opposite_pos}_${type}`;
            $(html_node)
              .addClass(`${single_star["metaData"][1]}_copy`)
              .attr("id", elem_id)
              .appendTo(
                `#${section}_${opposite_pos}_${single_star["metaData"][1]}`
              );

          } else {

            const elem_id = `${star}_${section}_${opposite_pos}_${type}`;
            $(html_node)
              .addClass(`${single_star["metaData"][1]}_copy`)
              .attr("id", elem_id)
              .appendTo(
                `#${section}_${single_star["position"]}_copy`
              );

          }
        }
      }
    }
  }
  OrderingStars(section);
}

function ClearMovingStars(section, type) {
  for (let position = 1; position <= 12; position++) {
    $(`div[id*='_${section}_${position}_${type}']`).remove();
    $(`span[id*='_${section}_${position}_${type}']`).remove();
  }
}

function OrderingStars(section) {

  for (let position = 1; position <= 12; position++) {

    let origin_stars = new Array();
    let borrowing_stars = new Array();
    let moving_stars = new Array();
    let borrowing_moving_stars = new Array();
    let collection = new Array();
    let second_tier = `#${section}_${position}_second_tier`;
    let moon = `#${section}_${position}_moon`;

    let second_tier_nodes = $(second_tier).children();
    let moon_nodes = $(moon).children();

    for (const node of second_tier_nodes) {
      const class_list = $(node).attr("class");
      if (
        class_list.includes("second_tier_copy") &&
        !class_list.includes("m_second_tier")
      ) {
        borrowing_stars.push(node);
      } else if (
        class_list.includes("m_second_tier") &&
        !class_list.includes("second_tier_copy")
      ) {
        moving_stars.push(node);
      } else if (
        class_list.includes("m_second_tier") &&
        class_list.includes("second_tier_copy")
      ) {
        borrowing_moving_stars.push(node);
      } else if (class_list.includes("second_tier")) {
        origin_stars.push(node);
      }
    }

    collection.push(
      collection.concat(
        origin_stars,
        borrowing_stars,
        borrowing_moving_stars,
        moving_stars
      )
    );

    collection.forEach((node) => {
      $(second_tier).append($(node));
    });

    origin_stars = new Array();
    borrowing_stars = new Array();
    moving_stars = new Array();
    borrowing_moving_stars = new Array();
    collection = new Array();

    for (const node of moon_nodes) {
      const class_list = $(node).attr("class");
      if (class_list.includes("moon_copy") && !class_list.includes("m_moon")) {
        borrowing_stars.push(node);
      } else if (
        class_list.includes("m_moon") &&
        !class_list.includes("moon_copy")
      ) {
        moving_stars.push(node);
      } else if (
        class_list.includes("m_moon") &&
        class_list.includes("moon_copy")
      ) {
        borrowing_moving_stars.push(node);
      } else if (class_list.includes("moon")) {
        origin_stars.push(node);
      }
    }

    collection.push(
      collection.concat(
        origin_stars,
        borrowing_stars,
        borrowing_moving_stars,
        moving_stars
      )
    );

    collection.forEach((node) => {
      $(moon).append($(node));
    });
  }
}

function ShowConnectedPosition(connectedPosition) {
  const position = parseInt(connectedPosition.split("_")[2], 10);
  const section = connectedPosition.split("_")[0] + "_" + connectedPosition.split("_")[1];
  const trigger_point = position - 1;
  const connectedPositions = [position >= 5 ? position - 4 - 1 : position - 4 + 12 - 1, position < 9 ? position + 4 - 1 : position + 4 - 12 - 1, position <= 6 ? position + 6 - 1 : position + 6 - 12 - 1];

  ClearConnectedPosition(section);

  /*$(`#${section}_center_vec_mid_col`).removeClass("center_vec_border");*/
  zodiac.forEach((value, index) => {
    if (index == trigger_point) {
      $(`#${section}_${index + 1}_connectedPosition`).attr("onclick", "ClickToClearConnectedPosition(this.id)");
      $(`#${section}_${value}`).addClass("fadeIn");
    } else if (connectedPositions.includes(index)) {
      $(`#${section}_${value}`).addClass("fadeIn");
    } else {
      $(`#${section}_${value}`).addClass("fadeOut");
    }
  });
}

function ClickToClearConnectedPosition(connectedPosition) {
  const section = connectedPosition.split("_")[0] + "_" + connectedPosition.split("_")[1];
  ClearConnectedPosition(section);
}

function ClearConnectedPosition(section) {
  /*if (!$(`#${section}_center_vec_mid_col`).hasClass("center_vec_border")) {
    $(`#${section}_center_vec_mid_col`).addClass("center_vec_border");
  }*/
  zodiac.forEach((value, index) => {
    $(`#${section}_${value}`).removeClass("fadeOut");
    $(`#${section}_${value}`).removeClass("fadeIn");
    $(`#${section}_${index + 1}_connectedPosition`).attr("onclick", "ShowConnectedPosition(this.id)");
  });
}

function ShowOrHideModal(section) {
  if ($("#modal_container").css("display") == "flex") {
    $("#modal_container").css("display", "none");
  } else {
    $("#life_link").attr("onclick", `SetArticlesToModal('${section}','life')`);
    $("#parent_link").attr("onclick", `SetArticlesToModal('${section}','parent')`);
    $("#thought_link").attr("onclick", `SetArticlesToModal('${section}','thought')`);
    $("#housing_link").attr("onclick", `SetArticlesToModal('${section}','housing')`);
    $("#career_link").attr("onclick", `SetArticlesToModal('${section}','career')`);
    $("#friendship_link").attr("onclick", `SetArticlesToModal('${section}','friendship')`);
    $("#travel_link").attr("onclick", `SetArticlesToModal('${section}','travel')`);
    $("#illness_link").attr("onclick", `SetArticlesToModal('${section}','illness')`);
    $("#possession_link").attr("onclick", `SetArticlesToModal('${section}','possession')`);
    $("#posterity_link").attr("onclick", `SetArticlesToModal('${section}','posterity')`);
    $("#marriage_link").attr("onclick", `SetArticlesToModal('${section}','marriage')`);
    $("#sibiling_link").attr("onclick", `SetArticlesToModal('${section}','sibiling')`);
    $("#modal_container").css("display", "flex");
    SetArticlesToModal(section, "life");
  }
}

function SetArticlesToModal(section, position) {
  if (articles != null) {
    let content = articles[section][position];
    $("#modal").empty().append(content).scrollTop(0);
  }
}

function QueryAllArticle(section, position) {
  articles[section] = {};
  GETRequest(`/getArticles/${position}/life`, (result, status, xhr, result_type) => {
    if (result_type == "success") {
      articles[section]["life"] = result["result"];
    } else {
      articles[section]["life"] = "";
    }
  });
  GETRequest(`/getArticles/${position}/parent`, (result, status, xhr, result_type) => {
    if (result_type == "success") {
      articles[section]["parent"] = result["result"];
    } else {
      articles[section]["parent"] = "";
    }
  });
  GETRequest(`/getArticles/${position}/thought`, (result, status, xhr, result_type) => {
    if (result_type == "success") {
      articles[section]["thought"] = result["result"];
    } else {
      articles[section]["thought"] = "";
    }
  });
  GETRequest(`/getArticles/${position}/housing`, (result, status, xhr, result_type) => {
    if (result_type == "success") {
      articles[section]["housing"] = result["result"];
    } else {
      articles[section]["housing"] = "";
    }
  });
  GETRequest(`/getArticles/${position}/career`, (result, status, xhr, result_type) => {
    if (result_type == "success") {
      articles[section]["career"] = result["result"];
    } else {
      articles[section]["career"] = "";
    }
  });
  GETRequest(`/getArticles/${position}/friendship`, (result, status, xhr, result_type) => {
    if (result_type == "success") {
      articles[section]["friendship"] = result["result"];
    } else {
      articles[section]["friendship"] = "";
    }
  });
  GETRequest(`/getArticles/${position}/travel`, (result, status, xhr, result_type) => {
    if (result_type == "success") {
      articles[section]["travel"] = result["result"];
    } else {
      articles[section]["travel"] = "";
    }
  });
  GETRequest(`/getArticles/${position}/illness`, (result, status, xhr, result_type) => {
    if (result_type == "success") {
      articles[section]["illness"] = result["result"];
    } else {
      articles[section]["illness"] = "";
    }
  });
  GETRequest(`/getArticles/${position}/possession`, (result, status, xhr, result_type) => {
    if (result_type == "success") {
      articles[section]["possession"] = result["result"];
    } else {
      articles[section]["possession"] = "";
    }
  });
  GETRequest(`/getArticles/${position}/posterity`, (result, status, xhr, result_type) => {
    if (result_type == "success") {
      articles[section]["posterity"] = result["result"];
    } else {
      articles[section]["posterity"] = "";
    }
  });
  GETRequest(`/getArticles/${position}/marriage`, (result, status, xhr, result_type) => {
    if (result_type == "success") {
      articles[section]["marriage"] = result["result"];
    } else {
      articles[section]["marriage"] = "";
    }
  });
  GETRequest(`/getArticles/${position}/sibiling`, (result, status, xhr, result_type) => {
    if (result_type == "success") {
      articles[section]["sibiling"] = result["result"];
    } else {
      articles[section]["sibiling"] = "";
    }
  });
}