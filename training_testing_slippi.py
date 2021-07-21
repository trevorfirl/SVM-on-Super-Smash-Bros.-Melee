import numpy as np
import matplotlib.pyplot as plt
from sklearn import svm, preprocessing
from sklearn.svm import SVC
import pandas as pd
from matplotlib import style
from sklearn import datasets
from sklearn.metrics import confusion_matrix, precision_score
from sklearn.model_selection import train_test_split
import seaborn as sns
style.use("ggplot")

def plot_coefficients(classifier, feature_names, top_features=20):
        
    # Access the coefficients from classifier
    coef = classifier.coef_

    # Access the classes
    classes = classifier.classes_

    # Iterate the loop for number of classes
    for i in range(len(classes)):


        print(classes[i])

        # Access the row containing the coefficients for this class
        class_coef = coef[i]


        # Below this, I have just replaced 'i' in your code with 'class_coef'
        # Pass this to get top and bottom features
        top_positive_coefficients = np.argsort(class_coef)[-top_features:]
        top_negative_coefficients = np.argsort(class_coef)[:top_features]

        # Concatenate the above two 
        top_coefficients = np.hstack([top_negative_coefficients, 
                                      top_positive_coefficients])
        # create plot
        plt.figure(figsize=(10, 3))

        colors = ["red" if c < 0 else "blue" for c in class_coef[top_coefficients]]
        plt.bar(np.arange(2 * top_features), class_coef[top_coefficients], color=colors)
        feature_names = np.array(feature_names)

        # Here I corrected the start to 0 (Your code has 1, which shifted the labels)
        plt.xticks(np.arange(1, 1 + 2 * top_features), 
                   feature_names[top_coefficients], rotation=60, ha="right")
        plt.show()


FEATURES =      [#'character played',
                'opponent char',
                'ipm',
                'win',
                'length',
                'openingPerKill',
                'damagePerOpening',
                'neutralWinRatio',
                'openingConversionRate',
                'ddCount',
                'wdCount',
                'lgCount',
                'numGrabs']

def f_importances(coef, names):
    imp = coef
    imp,names = zip(*sorted(zip(imp,names)))
    plt.barh(range(len(names)), imp, align='center')
    plt.yticks(range(len(names)), names)
    plt.show()

def Build_Data_Set():
        data_df = pd.read_csv("CSV RANDOMIZED.csv")

        #data_df = data_df[:100]

        X = np.array(data_df[FEATURES].values)

        # Fox = 0 : Marth = 1 : Falco = 2 : Jigglypuff = 3 

        y = (data_df["character played"].values.tolist())

        X = preprocessing.scale(X)

        return X,y

def Analysis():
        
    X, y = Build_Data_Set()
    print(len(X))


    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state = 0)

    # training a rbf SVM classifier
    svm_model = svm.SVC(kernel="linear", C = 0.5).fit(X_train, y_train)
    svm_predictions = svm_model.predict(X_test)

    print('coef')
    print(svm_model.coef_)
    print(svm_model.classes_)

    #0v1
    #0v2
    #0v3
    #1v2
    #1v3
    #2v3

    #print(svm_model.dual_coef_)
  
    # model accuracy for X_test  
    accuracy = svm_model.score(X_test, y_test)
    print(accuracy)
  
    # creating a confusion matrix
    cm = confusion_matrix(y_test, svm_predictions, normalize='true')
    confmat = cm
    cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]

    #The diagonal entries are the accuracies of each class
    print(cm.diagonal())

    ps = precision_score(svm_predictions, y_test, average=None)
    print(ps)

    # PLOT CONFUSION MATRIX #

    # xlabels = ["Fox", "Marth", "Falco", "Jigglypuff"]
    # ylabels = ["Fox", "Marth", "Falco", "Jigglypuff"]
    # res = sns.heatmap(confmat, annot=True, cmap="Blues", yticklabels=ylabels, xticklabels=xlabels, cbar=False, annot_kws={'size':18})
    # res.set_xticklabels(res.get_xmajorticklabels(), fontsize = 12)
    # res.set_yticklabels(res.get_ymajorticklabels(), fontsize = 12, rotation=45)
    # plt.title("Character Prediction Confusion Matrix (Normalized)")
    # plt.show();

    #plot_coefficients(svm_model, FEATURES, top_features=12)



###############################################################

    from sklearn import datasets, linear_model
    from sklearn.model_selection import cross_val_predict, cross_val_score
    lasso = linear_model.Lasso()
    scores = cross_val_score(svm.SVC(kernel="rbf", C = 1, gamma=0.1), X, y, cv=10)
    print(scores.mean())

###############################################################

    # from numpy import array
    # from sklearn.model_selection import KFold
    # # data sample
    # data = X
    # # prepare cross validation
    # kfold = KFold(n_splits=10, shuffle=True)
    # # enumerate splits
    # for train, test in kfold.split(data):
	#     print('train: %s, test: %s' % (data[train], data[test]))

##################################################################
    
    # clf = svm.SVC(kernel="linear", C= 1.0)
    # clf.fit(X_train, y_train)

    # correct_count = 0

    # for x in range(1, test_size+1):
    #     if clf.predict([X[-x]])[0] == y[-x]:
    #         correct_count += 1

    # print("Accuracy:", (correct_count/test_size) * 100.00)

    # w = clf.coef_[0]
    # a = -w[0] / w[1]
    # xx = np.linspace(min(X[:, 0]), max(X[:, 0]))
    # yy = a * xx - clf.intercept_[0] / w[1]

    # # h0 = plt.plot(xx,yy, "k-", label="non weighted")

    # print(clf.classes_)
    # f_importances(clf.coef_[0], FEATURES)

    # # plt.scatter(X[:, 0],X[:, 1], c=y)
    # # plt.show()

Analysis()