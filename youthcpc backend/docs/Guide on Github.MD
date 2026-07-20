# 📘 HMS Git Workflow
👉 Repo:
`https://github.com/kalayu-redae/youthcpc`

# 1. FIRST TIME SETUP (ONLY ONCE)
git clone https://github.com/kalayu-redae/youthcpc.git

cd HospitalManagmentSystem

Check branches:git branch -a

#Create develop branch
git checkout main
git pull origin main
git checkout -b develop
git push -u origin develop

# 2. CREATE FEATURE BRANCH (USE MANY TIMES)
git checkout develop
git pull origin develop
git checkout -b feature/branch-name
git push -u origin feature/branch-name

# 3. DAILY WORKFLOW (VERY IMPORTANT)

### Always start with:
git checkout develop
git pull origin develop

### Go to your branch:

git checkout feature/core-system

### Save your work:
git add .
git commit -m "Add: user authentication logic"
git push

# 4. UPDATE YOUR BRANCH (AVOID ERRORS)

git checkout develop
git pull origin develop

git checkout feature/core-system
git merge develop

# 5. MERGE YOUR WORK INTO DEVELOP

```bash
git checkout develop
git pull origin develop
git merge feature/core-system
git push origin develop
```

---

# 6. FINAL MERGE TO MAIN (DEPLOY)
git checkout main
git pull origin main
git merge develop
git push origin main

# 8. CHECK EVERYTHING
git branch        # current branch
git status        # changes
git log --oneline # history

# 9. GOLDEN RULES (VERY IMPORTANT)

* Always work on `module/*`
* Always pull before coding
* Commit frequently
* Don’t work on `main`
* Don’t skip `git pull`
* Don’t mix modules in one branch


# Daily Git Workflow Script
## 1️⃣ Switch to develop branch and update it
git checkout develop
git pull origin develop
## 2️⃣ Create or switch to your branch
git checkout $BRANCH
## 3️⃣ Merge latest develop into your branch
git merge develop
## 4️⃣ Stage changes and commit
git add .
git commit -m "$COMMIT_MSG"
## 5️⃣ Push branch to remote
git push origin $BRANCH
## 6️⃣ Merge branch back to develop
git checkout develop
git pull origin develop
git merge $FEATURE_BRANCH
git push origin develop
## 7️⃣ Optional: Merge develop into main (production)
    git checkout main
    git pull origin main
    git merge develop
    git push origin main