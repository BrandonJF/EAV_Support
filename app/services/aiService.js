eav.factory("aiService", function($http, localStorageService, userService) {
    var aiService = {
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
        getAiDocs: function(aiNumber) {
            return $http({
                url: config.baseurl + "/eav/cgi-bin/actionitemsdll.dll/info?",
                method: 'GET',
                params: {
                    "LISTITEMNUM": aiNumber,
                    "WMT": "none",
                    "RESPONSEPAGE": "docs_JSON.json",
                }
            });
        },
        openAiDoc: function(fileName){
            window.open(config.fileurl + fileName, '_blank');
        },
        getBookmarks: function() {
            //console.log("getBookmarks Called.");
            return aiService.bookmarks;
        },
        storeBookmark: function(actionItem) {
            aiService.bookmarks.push(actionItem);
            localStorageService.add('userBookmarks', aiService.bookmarks);

        },

        removeBookmark: function(actionItem) {
            _.remove(aiService.bookmarks, function(aiObj) {
                return aiObj.LISTITEMNUM === actionItem.LISTITEMNUM;
            });
            localStorageService.add('userBookmarks', aiService.bookmarks);
        },
        toggleBookmark: function(actionItem) {
            var containsBookmark = _.any(aiService.bookmarks, function(aiObj) {
                return aiObj.LISTITEMNUM === actionItem.LISTITEMNUM;
            });
            if (containsBookmark === true) {
                actionItem.bookmarked = false;
                aiService.removeBookmark(actionItem);
            } else if (containsBookmark === false) {
                actionItem.bookmarked = true;
                aiService.storeBookmark(actionItem);
            }

        },
        isBookmarked: function(actionItem) {
            return _.any(aiService.bookmarks, function(aiObj) {
                return aiObj.LISTITEMNUM === actionItem.LISTITEMNUM;
            });
        },
        openUserAi: function(aiNumber) {
            window.open('https://www.euclidtechnology.com/support/ActionItem.aspx?cv_ActionItem=' + aiNumber, '_blank');
        },
        modifyAis: function(actionItems) {
            $.each(actionItems, function(index, actionItem) {
                actionItem = aiService.modifyAi(actionItem);
            });
            return actionItems;
        },
        modifyAi: function(actionItem) {
            actionItem.actionTypeClass = actionItem.ACTIONTYPE.replace(/\s+/g, '').replace("/", "");
            actionItem.bookmarked = aiService.isBookmarked(actionItem);
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
