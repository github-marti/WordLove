$(document).ready(function () {
    $(document).on("click", ".single-vocab", function () {
        let difficulty = $(this).attr("difficulty");
        let id = $(this).attr("vocab-id")
        let difficultySpan = $(`#${id}-difficulty-span`);
        switch (difficulty) {
            case "":
                difficultySpan.html(`
            <span class="difficulty-option">easy</span> - <span class="difficulty-option">medium</span> - <span class="difficulty-option">hard</span>
          `);
                break;
            case "easy":
                difficultySpan.html(`
            <span class="easy-text difficulty-option">Easy</span> - <span class="difficulty-option">medium</span> - <span class="difficulty-option">hard</span>
          `);
                break;
            case "medium":
                difficultySpan.html(`
          <span class="difficulty-option">easy</span> - <span class="medium-text difficulty-option">Medium</span> - <span class="difficulty-option">hard</span>
          `);
                break;
            case "hard":
                difficultySpan.html(`
          <span class="difficulty-option">easy</span> - <span class="difficulty-option">medium</span> - <span class="hard-text difficulty-option">Hard</span>
          `)
                break;
        };
    });

    $(document).on("click", ".fa-plus", function() {
        $(this).parent().next().toggle();
    });

    $(document).on("click", "#save-definition", function() {
        let definition = $(this).prev().val();
        let id = $(this).attr("vocab-id");
        let obj = {
            definitions: definition
        };
        $.ajax({
            method: "PUT",
            url: `/api/vocab/${id}`,
            data: obj
        }).then(function(res) {
            let id = $(".list-title").attr("list-id");
            $("#parent-container").html("");
            $.get("/api/vocablists/" + id, function (data) {
                $bars.render('listDisplay', 'parent-container', { vocabLists: data[0] });
            })
        })
    });

    $(document).on("click", "#save-note", function() {
        let note = $(this).prev().val();
        let id = $(this).attr("vocab-id");
        let obj = {
            notes: note
        };
        $.ajax({
            method: "PUT",
            url: `/api/vocab/${id}`,
            data: obj
        }).then(function(res) {
            let id = $(".list-title").attr("list-id");
            $("#parent-container").html("");
            $.get("/api/vocablists/" + id, function (data) {
                $bars.render('listDisplay', 'parent-container', { vocabLists: data[0] });
            })
        })
    });

    $(document).on("click", ".difficulty-option", function () {
        let id = $(this).parent().attr("id").split("-")[0];
        let difficulty = $(this).text().toLowerCase();

        let obj = {
            difficulty: difficulty
        };
        $.ajax({
            method: "PUT",
            url: `/api/vocab/${id}`,
            data: obj
        }).then(function (res) {
            let id = $(".list-title").attr("list-id");
            $("#parent-container").html("");
            $.get("/api/vocablists/" + id, function (data) {
                $bars.render('listDisplay', 'parent-container', { vocabLists: data[0] });
            })
        });
    });

    $(document).on("click", "#vocab-delete-btn", function () {
        let id = $(this).attr("vocab-id");
        $.ajax({
            method: "DELETE",
            url: `/api/vocab/${id}`
        }).then(function (res) {
            let id = $(".list-title").attr("list-id");
            $("#parent-container").html("");
            $.get("/api/vocablists/" + id, function (data) {
                $bars.render('listDisplay', 'parent-container', { vocabLists: data[0] });
            });
        });
    });

    $(document).on("click", ".list-delete-btn", function () {
        $(".delete-modal").addClass("is-active");
    });
});