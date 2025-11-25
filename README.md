# Static Sites

Simple static HTML pages deployed to the homelab cluster.

## Structure

```
static-sites/
├── sites/                    # Source HTML files
│   ├── hello-world/
│   │   └── index.html
│   ├── product/
│   │   └── index.html
│   └── solutions/
│       └── index.html
├── k8s/                      # Kubernetes manifests
│   ├── hello-world/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   ├── product/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   ├── solutions/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   └── networkpolicy.yaml
└── kustomization.yaml        # Auto-generates ConfigMaps from sites/
```

## How It Works

HTML files in `sites/` are automatically converted to ConfigMaps via Kustomize's `configMapGenerator`.
When you edit an HTML file and commit, ArgoCD detects the change and syncs automatically.

**No manual ConfigMap updates needed!**

## Deployment

Deployed via ArgoCD from the [homelab-platform](https://github.com/sojohnnysaid/homelab-platform) repo.

### Manual Deploy

```bash
kubectl apply -k .
```

## Adding a New Site

1. Create `sites/<site-name>/index.html` with your HTML content
2. Create deployment and service in `k8s/<site-name>/`
3. Add new site to `kustomization.yaml`:
   - Add deployment/service to `resources`
   - Add ConfigMap generator entry pointing to your HTML file
4. Commit changes - ArgoCD will sync automatically
5. Update cloudflared config in homelab-platform to add route

## Related Repos

- [homelab-platform](https://github.com/sojohnnysaid/homelab-platform) - Platform infrastructure & ArgoCD apps
