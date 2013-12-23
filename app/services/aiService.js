eav.factory("aiService", function($http, localStorageService, userService) {
    var aiService = {
        //actionItemDllBaseUrl:"https://www.euclidtechnology.com/cvweb/cgi-bin/actionitemsdll.dll/list?",
        actionItemDllBaseUrl: config.baseurl + "/eav/cgi-bin/utilities.dll/customlist?",
        bookmarks: localStorageService.get('userBookmarks') || [],
        aiListFilter: "",
        getUserAis: function(username) {
            //console.log("getUserAis Called.");
            //var userId = localStorageService.get("username");
            return $http({
                url: aiService.actionItemDllBaseUrl,
                method: 'GET',
                params: {
                    "user": username,
                    "sqlname": "GETEAVUSERAIS",
                    //"RANGE": "1/15",
                    "SORT": "LISTITEMNUM DESC",
                    "WBP": "ai_list_JSON.json",
                    "WHP": "ai_list_header_JSON.json",
                    "wmt": "none"
                }
            });


        },
        getAiNotes: function(aiNumber) {
            return $http({
                url: config.baseurl + "/eav/cgi-bin/actionitemsdll.dll/info?",
                method: 'GET',
                params: {
                    "LISTITEMNUM": aiNumber,
                    "RESPONSEPAGE": "actionNote.htm",
                    "WMT": "none"
                }
            });
        },

        getAiDetails: function(aiNumber) {
            return $http({
                //url: "https://www.euclidtechnology.com/cvweb/cgi-bin/actionitemsdll.dll/info?",
                url: config.baseurl + "/eav/cgi-bin/utilities.dll/customlist?",
                method: 'GET',
                params: {
                    "sqlname": "GETEAVUSERAIS",
                    "aiNum": aiNumber,
                    "WMT": "none",
                    "WBP": "ai_list_JSON.json",
                }
            });
        },



        getBookmarks: function() {
            //console.log("getBookmarks Called.");
            return aiService.bookmarks;
        },
        storeBookmark: function(actionItem) {
            //console.log("storeBookmark Called.");
            //console.log("this is the action item to store", actionItem);
            //console.log("this is what aiService.bookmarks looks like now", aiService.bookmarks);
            aiService.bookmarks.push(actionItem);
            //console.log("this is what it looks like after the push", aiService.bookmarks);
            //console.log("here is what the localstorage looks like b4 push", localStorage["euclidAV.userBookmarks"]);
            localStorageService.add('userBookmarks', aiService.bookmarks);
            //console.log("here is what the localstorage looks like after push", localStorage["euclidAV.userBookmarks"]);
        },

        removeBookmark: function(actionItem) {
            //console.log("removeBookmark Called.");
            //console.log("Removing", actionItem);
            //console.log("matching to", aiService.bookmarks);

            //aiService.bookmarks = _.without(aiService.bookmarks,actionItem);
            _.remove(aiService.bookmarks, function(aiObj) {
                return aiObj.LISTITEMNUM === actionItem.LISTITEMNUM;
            });
            //console.log("New array is", aiService.bookmarks);
            localStorageService.add('userBookmarks', aiService.bookmarks);
        },

        toggleBookmark: function(actionItem) {
            ////console.log(_.indexOf(bookmarks, actionItem.LISTITEMNUM)!==-1);
            //console.log("toggleBookmark Called.");
            // var containsBookmark = _.indexOf(aiService.bookmarks, actionItem.LISTITEMNUM)!==-1;
            var containsBookmark = _.any(aiService.bookmarks, function(aiObj) {
                return aiObj.LISTITEMNUM === actionItem.LISTITEMNUM;
            });

            if (containsBookmark === true) {
                //console.log("The bookmark is already there");
                actionItem.bookmarked = false;
                aiService.removeBookmark(actionItem);
            } else if (containsBookmark === false) {
                //console.log("The bookmark is NOT already there");
                actionItem.bookmarked = true;
                aiService.storeBookmark(actionItem);
            }
            //console.log(actionItem);
            //console.log("aiServBookmarks", aiService.bookmarks);
        },

        isBookmarked: function(actionItem) {
            //console.log("isBookmarked Called.");
            //return _.indexOf(aiService.bookmarks, aiNumber)!==-1 ? true : false;
            return _.any(aiService.bookmarks, function(aiObj) {
                return aiObj.LISTITEMNUM === actionItem.LISTITEMNUM;
            });
        },
        openUserAi: function(aiNumber) {
            //            chrome.tabs.create({
            //                "url": "https://www.euclidtechnology.com/support/ActionItem.aspx?cv_ActionItem=" + aiNumber
            //            });
            window.open('https://www.euclidtechnology.com/support/ActionItem.aspx?cv_ActionItem=' + aiNumber, '_blank');
        },
        modifyAis: function(actionItems) {
            //console.log("modifyAis Called.");
            $.each(actionItems, function(index, actionItem) {
                actionItem = aiService.modifyAi(actionItem);
            });
            return actionItems;
        },
        modifyAi: function(actionItem) {
            //console.log("modifyAi Called.");
            actionItem.actionTypeClass = actionItem.ACTIONTYPE.replace(/\s+/g, '').replace("/", "");
            actionItem.bookmarked = aiService.isBookmarked(actionItem);
            //console.log(actionItem.bookmarked);
            return actionItem;
        },
        setBadge: function(text) {
            //            chrome.browserAction.setBadgeText({
            //                "text": text
            //            });
        },
        setAiListFilter: function(filter) {
            aiService.aiListFilter = filter;
        },
        getAiListFilter: function() {
            return aiService.aiListFilter;
        }

    }; //end aiService Object
    return aiService;

});
