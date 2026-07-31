# ElGoshenFoundation Image Manager

The website now includes Decap CMS at `/admin/`. It lets the owner upload and replace the hero, programme, leadership, story, and gallery images without editing HTML or CSS.

## One-time publishing setup

1. Create or connect the website repository to a Netlify project.
2. Deploy the project from the `main` branch.
3. In Netlify, open **Project configuration → Identity** and enable Identity.
4. Under **Registration**, select **Invite only**.
5. Under **Services → Git Gateway**, enable Git Gateway and authorize the connected repository.
6. Invite the website owner from the Identity page.

## Owner workflow

1. Visit `https://your-domain.com/admin/`.
2. Sign in using the invitation email.
3. Choose **Website Images → Image Library**.
4. Upload or select a photo for the required website area.
5. Select **Publish**.

New uploads are stored in `img/uploads/`. The website reads `data/site-images.json`, so the selected images automatically appear in the mapped sections after deployment.

## Notes

- The image editor requires the deployed Netlify site; it will not authenticate from a double-clicked local HTML file.
- Replace `branch: main` in `admin/config.yml` if the deployment uses a different primary branch.