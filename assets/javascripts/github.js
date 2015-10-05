$.mostPopular = function (username, callback) {
    return $.getJSON("https://api.github.com/search/repositories?q=%40" + username, callback);
};

$.statistics = function (username, repo, callback) {
    return $.getJSON("https://api.github.com/repos/" + username + "/" + repo + "/stats/contributors", callback);
};

$.pullRequests = function (username, repo, callback) {
    return $.getJSON("https://api.github.com/repos/" + username + "/" + repo + "/pulls?per_page=100&state=closed", callback);
};

var jetbrains = {
    yearlyTotalCommits: 0,
    projects: {},
    repositories: ["intellij-community", "kotlin", "anko", "ideavim", "MPS", "Nitra", "intellij-scala", "intellij-plugins", "la-clojure", "colorSchemeTool", "phpstorm-workshop", "FSharper", "Grammar-Kit", "resharper-angularjs", "workshop-jb", "meta-runner-power-pack", "intellij-haxe", "phpstorm-stubs", "spek", "resharper-nuget", "kotlin-examples", "xodus", "intellij-sbt"],
    jetbrainers: ["abreslav", "Alefas", "alexander-doroshko", "AMPivovarov", "alexeypegov", "anna239", "anstarovoyt", "ArtemGovorov", "asedunov", "ashatalin", "avokin", "bashor", "BasLeijdekkers", "batya239", "belarusian", "boogiecat", "boot85", "breandan", "bulenkov", "chashnikov", "cheptsov", "Chushuhuch", "citizenmatt", "controlflow", "CrazyCoder", "cy6erGn0m", "cy6erskunk", "dboulytchev", "deadok22", "denis-zhdanov", "denofevil", "derigel23", "develar", "dmitry-avdeev", "dmitry-treskunov", "dnpetrov", "dovchinnikov", "dzharkov", "east825", "ekoshkin", "erokhins", "Eugene-Kudelevsky", "eugenezh", "EvilTosha", "geevee", "goodwinnk", "gorrus", "gregsh", "hhariri", "ignatov", "ilya-g", "ilya-klyuchnikov", "IlyaKazakevich", "iromeo", "JamesKovacs", "JB-Dmitry", "jonnyzzz", "juliabeliaeva", "katepol", "kir", "kirelagin", "klikh", "ktisha", "leo-from-spb", "Leonya", "leostryuk", "lepenkinya", "ligee", "Linfar", "Lugzan", "maxim5", "max-kammerer", "maxmanuylov", "maxmedvedev", "mazine", "medvector", "mglukhikh", "MichaelNedzelsky", "mikhailvink", "morj", "NadyaZabrodina", "NataliaUkhorskaya", "nesteruk", "neuro159", "nicity", "NikolayPianikov", "olegs", "olegstepanov", "orangy", "orybak", "paksv", "pauleveritt", "pavelfatin", "pavelsher", "pchel-", "penemue", "pTalanov", "rayshade", "satamas", "sayon", "segrey", "SergeyZh", "shafirov", "shalupov", "solomatov", "someone-with-default-username", "svtk", "topka", "traff", "trespasserw", "trishagee", "tsvtkv", "udalov", "valentinkip", "varsy", "VladRassokhin", "vladsoroka", "vlasovskikh", "ww898", "yanex", "YannCebron", "yole", "zajac", "zanyato", "zarechenskiy", "zolotov"],
    jetcontributors: [],
    topContributors: []
};

$.fn.loadStatistics = function (username) {
    var statistics, popular;

    $.mostPopular("jetbrains", function (data) {
        popular = data.items.slice(0, 3);

        var promises = [];
        statistics = [];
        $.each(popular, function (i, n) {
            var repo_name = n.name;
            promises.push($.statistics(username, repo_name, function (data) {
                if (jetbrains.projects[repo_name] == undefined) {
                    jetbrains.projects[repo_name] = {};
                }
                jetbrains.projects[repo_name].statistics = data;
            }));
            promises.push($.pullRequests(username, repo_name, function (data) {
                if (jetbrains.projects[repo_name] == undefined) {
                    jetbrains.projects[repo_name] = {};
                }
                jetbrains.projects[repo_name].pullRequests = data;
            }));
        });

        $.when.apply($, promises).done(function () {
            var contributors = [];
            $.each(jetbrains.projects, function (i, n) {
                contributors = contributors.concat(n.statistics);
            });

            var extStatistics = [], intStatistics = $.grep(contributors, function (item) {
                var isInternal = $.inArray(item.author.login, jetbrains.jetbrainers) >= 0;
                if (!isInternal) {
                    extStatistics.push(item);
                    if (jetbrains.jetcontributors.indexOf(item.author.login) < 0) {
                        jetbrains.jetcontributors.push(item.author.login);
                    }
                }

                return isInternal;
            });

            $("#totalcontributors").text(jetbrains.jetcontributors.length + jetbrains.jetbrainers.length);
            $("#externalcontributors").text(jetbrains.jetcontributors.length);

            $.each(intStatistics, function () {
                var weeksLastYear = this.weeks.slice(this.weeks.length - 52, this.weeks.length);
                $.each(weeksLastYear, function () {
                    jetbrains.yearlyTotalCommits += this.c;
                });
            });

            $("#yearlycommits").text(jetbrains.yearlyTotalCommits);

            var extContrib = {};
            $.each(extStatistics, function () {
                var name = this.author.login;
                if (extContrib[name] == undefined) {
                    extContrib[name] = 0;
                }

                var weeksLastYear = this.weeks.slice(this.weeks.length - 52, this.weeks.length);
                $.each(weeksLastYear, function () {
                    extContrib[name] += this.c;
                });
            });

            var topContrib = Object.keys(extContrib).sort(function (a, b) {
                return extContrib[b] - extContrib[a];
            });

            $.each(topContrib.slice(0, 10), function () {
                var committer = {};
                committer[this] = extContrib[this];
                jetbrains.topContributors.push(committer);
                $("#leaderboard ul").append('<li><a href="https://github.com/' + this + '">' + this + '</a> has contributed over ' + extContrib[this] + ' commits to JetBrains\' software. ' + '</li>');
            });

            var mergedPulls = $.map(jetbrains.projects, function (project) {
                return $.grep(project.pullRequests, function (pullRequest) {
                    return pullRequest.merged_at != null &&
                        jetbrains.jetbrainers.indexOf(pullRequest.user.login) < 0;
                });
            })

            mergedPulls.sort(function(a, b) {
                return b.merged_at.localeCompare(a.merged_at);
            });

            $.each(mergedPulls, function () {
                $("#merged_pulls ul").append('<li><a href="' + this.html_url + '">' + this.title + '</a> by <a href="https://github.com/' + this.user.login + '">' + this.user.login + '</a> was merged on ' + this.merged_at + '.</li>');
            });
        });
    });
};